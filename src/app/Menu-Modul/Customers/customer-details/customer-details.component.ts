import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { FirebaseService } from "src/app/core/firebase.service";
import { map } from "rxjs/operators";
import {
  Customer,
  Debt,
  Paid,
  Table,
} from "src/app/shared/models/customerModel";
import { ActivatedRoute, Routes } from "@angular/router";
import { DialogAddDebtComponent } from "../dialog-add-debt/dialog-add-debt.component";

@Component({
  selector: "customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  displayedColumns: string[] = ["harcama", "alınanlar", "tarih", "işlemler"];
  tables: Table[] = [
    { value: "borçlar-0", viewValue: "Borçlar" },
    { value: "ödemeler-1", viewValue: "Ödemeler" },
  ];
  dataSource: MatTableDataSource<any>;
  customerDebt: any[];
  customer: any;
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
  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.route.queryParams.subscribe((par) => {
      this.customer = {
        name: par["name"],
        surname: par["surname"],
      };
    });

    this.getCustomersDebt();
    this.getCustomersPaid();

    console.log("totalpaid");
    console.log(this.totalPayment);
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
              debtId: c.payload.doc.id,
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
        this.totalDebt();
        this.findLastDebtDate();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addDebt(debt) {
    this.firebaseService.addDebt(debt, this.id);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};

    let dialogRef = this.dialog.open(DialogAddDebtComponent, dialogConfig);
    console.log(".alıyor");

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDebt(result.value);
        result.value;
      }
    });
  }

  deleteDebt(debt) {
    console.log(debt);

    const paid = {
      paymentDate: new Date(),
      paymentId: "",
      debtId: "",
      products: "",
      debtPrice: 0,
    };
    const returnedTarget = Object.assign(paid, debt);
    this.firebaseService.addToPaid(this.id, returnedTarget);
    this.firebaseService.deleteDebt(this.id, debt);
  }

  selectClick(value) {
    this.option = value;
    console.log(value);
  }

  totalDebt() {
    this.total = 0;
    this.customerDebt.forEach((debt) => {
      this.total = debt.debtPrice + this.total;
      console.log(debt.debtPrice);
    });
    console.log(this.customerDebt);
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
        this.totalPaid();
        this.findLastPaidDate();
      });
  }
  totalPaid() {
    this.totalPay = 0;
    this.customerPaid.forEach((paid) => {
      console.log(paid);
      this.totalPay = Number(paid.debtPrice + this.totalPay);
    });
  }

  findLastDebtDate(){
    this.customerDebt.forEach(debt=>{  
       console.log(debt.debtDate)     
      const date=debt.debtDate.toDate();
      this.datesDebt.push(date)
      // this.dates.push(debt.debtDate.seconds)
    })
    this.datesDebt.sort((a:number,b:number)=>b-a)
    this.datesDebt[0]
    console.log(this.datesDebt[0])
  }
  
  findLastPaidDate(){
    this.customerPaid.forEach(paid=>{  
      console.log(paid.paymentDate.toDate())    
      const date=paid.paymentDate.toDate()
      this.datesPaid.push(date)
      // this.dates.push(debt.debtDate.seconds)
    })
    this.datesPaid.sort((a:number,b:number)=>b-a)
    console.log(this.datesPaid)  
    this.datesPaid[0]
    console.log(this.datesPaid[0])
  }
}
