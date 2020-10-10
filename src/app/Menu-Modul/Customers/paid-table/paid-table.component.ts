import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FirebaseService } from 'src/app/core/firebase.service';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'paid-table',
  templateUrl: './paid-table.component.html',
  styleUrls: ['./paid-table.component.scss']
})
export class PaidTableComponent implements OnInit {
displayedColumns: string[] = ["ödemeler", "alınanlar", "tarih"];

  dataSource: MatTableDataSource<any>;
  
  customerPaid:any[];
  totalPay: number;

  @Input() id:string;
  // @Output() totalPayString=new EventEmitter<string>()
  // @Output() valueChange= new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalPayStr: string;
  
  
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.getCustomersPaid();
    console.log(this.id)
  }
  
  getCustomersPaid() {    
    //
    this.firebaseService
      .getAllPaid(this.id)
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              paymentId: c.payload.doc.id,
              ...(c.payload.doc.data() as {}),
            };
          })
        )
      )
      .subscribe((customerPaid) => {
        console.log(customerPaid);
        this.customerPaid = customerPaid;
        this.dataSource = new MatTableDataSource(this.customerPaid);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.totalPaid();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // totalPaid(){
  //   this.totalPay=0
  //   this.customerPaid.forEach(paid=>{
  //   this.totalPay=paid.+this.totalPay
    
  //   })
  //    this.valueChange.emit(this.totalPay)
  //   this.totalPayStr=this.totalPay.toString()
  //   console.log( this.totalPayStr)   
  // }

  // sendTotalPaid(){
  //   this.totalPayString.emit(this.totalPayStr)
  // }
}
