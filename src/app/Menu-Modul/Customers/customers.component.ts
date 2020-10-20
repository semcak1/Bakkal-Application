import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Observable } from "rxjs";
import { FirebaseService } from "src/app/core/firebase.service";
import { componentProp, Customer } from "src/app/shared/models/customerModel";
import { DialogExComponent } from "./dialog-ex/dialog-ex.component";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { DialogAddDebtComponent } from "./dialog-add-debt/dialog-add-debt.component";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "ad",
    "soyad",
    "bakiye",
    "limit",
    "işlemler",
  ];
  dataSource: MatTableDataSource<Customer>;
  selectedRowId;
  toggle: boolean = false;
  customers: any[];
  loginState: componentProp;
  email: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRow: any;
  customerDebt: any[];
  total: number;

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.user.subscribe((res) => {
      if (res) {
        this.email = res.email;
      }
    });
    if (this.afAuth.authState) {
      this.loginState = {
        isLoggedIn: true,
        menuTitle: "Müşteriler",
      };
    }
  }

  ngOnInit() {
    this.getCustomers();
  }

  //get data from firebase service
  getCustomers() {
    //
    this.firebaseService
      .getDocuments("Customer")
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
      .subscribe((customers) => {
        this.customers = customers;
        this.dataSource = new MatTableDataSource(this.customers);
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
    this.selectedRowId = row.id;
    this.toggle = true;
    console.log(this.selectedRow);

    // setTimeout(() => {
    //   this.toggle=false
    // }, 4000);
  }

  clickOnDeleteButton(id: string) {
    this.firebaseService.deleteCustomer("Customer", id);
  }

  updateCustomer(customer: Customer) {
    this.firebaseService.updateCustomer(this.selectedRow.id, customer);
  }

  openUpdateDialog(value) {
    let dialogRef = this.dialog.open(DialogAddDebtComponent, {
      data: {
        name: "update",
        data: this.selectedRow,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCustomer(result.value);
      }
    });
  }

  // dialog kutusu açar
  openDialog() {
    let dialogRef = this.dialog.open(DialogExComponent, {
      data: this.selectedRow,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        // dialog kutusundan gelen cevap true ise silme methodunu çalıştırır.
        this.clickOnDeleteButton(this.selectedRow.id);
      }
    });
  }

 isLimitExceeded(){
   this.customers.forEach(customer=>{
     if(customer.totalDept>customer.limit){
       
     }
   })
 }
}
