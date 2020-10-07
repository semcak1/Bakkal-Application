import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/core/firebase.service';
import { Customer } from 'src/app/shared/models/customerModel';

export interface CustomerData {
  id: string;
  ad: string;
  soyad: string;
  bakiye: number;
  tarih:Date;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ad', 'soyad', 'bakiye'];
  dataSource: MatTableDataSource<Customer>;
  selectedRowId;
  toggle:boolean=false;
  customers:Customer[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private firebaseService:FirebaseService) { 
     
     
  }

  ngOnInit() {
    this.getCustomers()
   
    console.log(this)
   
    
  }
  
  //get data from firebase service
  getCustomers(){
    this.firebaseService.getDocuments("Customer").subscribe(res=>{
      console.log(res)
      this.customers=res
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clickOnListItem(row){    
      this.selectedRowId=row.customerId     
      this.toggle=true;
    setTimeout(() => {
      this.toggle=false
    }, 4000);
  }

  clickOnDeleteButton(){
    console.log(this.selectedRowId)
  }
}

