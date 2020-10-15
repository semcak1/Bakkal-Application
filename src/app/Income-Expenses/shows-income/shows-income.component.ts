import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FirebaseService } from 'src/app/core/firebase.service';
import { map } from 'rxjs/operators';
import { CategoriAddFormComponent } from '../categori-add-form/categori-add-form.component';
import { isNumber } from 'util';
import { Income } from 'src/app/shared/models/customerModel';

@Component({
  selector: 'shows-income',
  templateUrl: './shows-income.component.html',
  styleUrls: ['./shows-income.component.scss']
})
export class ShowsIncomeComponent implements OnInit {

  displayedColumns: string[] = ["kategori", "gelir", "işlemler"];
 
  dataSource: MatTableDataSource<any>;
  customerDebt: any[];
  incomes: any[];
  incomesDateId:any[];
  selectedId:string;
  id: string;
  option: string;
  total: number = 0;
  datesDebt:number[]=[];
  datesPaid:number[]=[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalPayment: any;
  customerPaid: any[];
  totalPay: number;
  selectedRowId;
  toggle: boolean = false;
  customers: any[];
  selectedRow: any;
  obj:Income;

  constructor(
    private firebaseService:FirebaseService,
    public dialog:MatDialog
    ) { }

  ngOnInit() {
    this.getIncomesCategory();
    
  }

   //get data from firebase service
   getIncomesCategory() {
    //
    this.firebaseService.getIncomesCategory()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
            incomeId: c.payload.doc.id,
              ...(c.payload.doc.data() as {}),
            };
          })
        )
      )
      .subscribe((incomes) => {
        console.log(incomes);
        this.incomes = incomes;
        
        
        this.dataSource = new MatTableDataSource(this.incomes);
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

  clickOnListItem(row) {
    this.selectedRow = row;
    this.selectedRowId = row.incomeId;
    this.toggle = true;
    console.log(this.selectedRow)
    console.log(this.selectedRowId)
    // setTimeout(() => {
    //   this.toggle=false
    // }, 4000);
  }

  clickOnDeleteButton(id: string) {
    this.firebaseService.deleteCustomer("Customer", id);
    console.log(this.selectedRowId);
  }

  addCategory(data){
    this.firebaseService.addCategory(data)
  }

  //Dialogs Methods
  openDialog(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.height="75%"
    dialogConfig.data={
      name:"addCategory"
    }
    let dialogRef=this.dialog.open(CategoriAddFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((result)=> {
      if (result){
        
       this.obj={
          category:result.value.category,
          incomeType:result.value.incomeType,
          subCategory:[]
        }
       
        console.log(result.value)
        this.findSubCategory(result.value)

        console.log(this.obj)
        this.addCategory(this.obj)
           console.log(this.obj)
        
      }
    })
  }

  openDeleteDialog(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.data={
      name:"delete",
      selectedRow:this.selectedRow
    }
    let dialogRef=this.dialog.open(CategoriAddFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
      if(result==="true"){
        this.firebaseService.deleteCategory(this.selectedRowId)
      }
    })
  }
 
  findSubCategory(object){
    for (let num in object){
      let numb=Number(num)      
        if(isNumber(numb) && object[numb]!==undefined){         
          this.obj.subCategory.push(object[numb])
        }
    }
  }
}
