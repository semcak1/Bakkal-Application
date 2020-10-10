import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FirebaseService } from 'src/app/core/firebase.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'paid-table',
  templateUrl: './paid-table.component.html',
  styleUrls: ['./paid-table.component.scss']
})
export class PaidTableComponent implements OnInit {
displayedColumns: string[] = ["ödemeler", "alınanlar", "tarih"];

  dataSource: MatTableDataSource<any>;
  
  customerPaid:any[];

  @Input() id:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
