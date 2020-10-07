import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/core/firebase.service';
import { Customer } from 'src/app/shared/models/customerModel';
import { DialogExComponent } from './dialog-ex/dialog-ex.component';




@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ad', 'soyad', 'bakiye','işlemler'];
  dataSource: MatTableDataSource<Customer>;
  selectedRowId;
  toggle:boolean=false;
  customers:Customer[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRow: any;

  constructor(
    private firebaseService:FirebaseService,
    private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.getCustomers()
   
    
   
    
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
      this.selectedRow=row   
      this.selectedRowId=row.customerId     
      this.toggle=true;
    // setTimeout(() => {
    //   this.toggle=false
    // }, 4000);
  }

  clickOnDeleteButton(){
    
    console.log(this.selectedRowId)
  }

  //open dialog
  openDialog(){
    let dialogRef=  this.dialog.open(DialogExComponent,{data:this.selectedRow})

    
    dialogRef.afterClosed().subscribe(result=>{
      if(result===true){
        
      }
      console.log(`dilog result is ${result}`)
    })
  
  }

}

