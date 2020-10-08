import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FirebaseService } from 'src/app/core/firebase.service';
import {map} from 'rxjs/operators'
import { Customer } from 'src/app/shared/models/customerModel';
import { ActivatedRoute, Routes } from '@angular/router';
 

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  displayedColumns: string[] = ["harcama", "alınanlar", "tarih", "işlemler"];
  dataSource: MatTableDataSource<any>;
  customerDebt:any[];
  customer:any;
  id:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private firebaseService:FirebaseService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() { 
    this.id=this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(par=>{
      this.customer={        
        name:par['name'],
        surname:par['surname']
      }      
    })
    
    this.getCustomersDebt(); 
  }   
  

  
  
    

  //get data from firebase service
  getCustomersDebt() {    
    //
    this.firebaseService
      .getAllDebt(this.id)
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              id: c.payload.doc.id,
              ...(c.payload.doc.data() as {}),
            };
          })
        )
      )
      .subscribe((customerDebt) => {
        console.log(customerDebt);
        this.customerDebt = customerDebt;
        this.dataSource = new MatTableDataSource(this.customerDebt);
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
