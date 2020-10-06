import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  displayedColumns: string[] = ['id', 'ad', 'soyad', 'bakiye','tarih'];
  dataSource: MatTableDataSource<CustomerData>;
  selectedRowId;
  toggle:boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 
     // Create 100 users
     const customer=[
       { id: '1',
        ad: 'Semih',
        soyad: 'çakmak',
        bakiye: 300,
        tarih:new Date()},
        { id: '2',
        ad: 'SÜeda',
        soyad: 'çakmak',
        bakiye: 500,
        tarih:new Date()}
     ]

     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(customer);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clickOnListItem(row){    
      this.selectedRowId=row.id     
      this.toggle=true;
    setTimeout(() => {
      this.toggle=false
    }, 4000);
  }

  clickOnDeleteButton(){
    console.log(this.selectedRowId)
  }
}

