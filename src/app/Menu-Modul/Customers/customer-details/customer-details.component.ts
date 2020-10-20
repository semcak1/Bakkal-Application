import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSnackBar,
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
import { AngularFireAuth } from "angularfire2/auth";

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
  customers: any[];
  id: string;
  option: string;
  total: number;
  datesDebt: number[] = [];
  datesPaid: number[] = [];

  messages={
    addMessage:'Başarıyla Eklendi.',
    deleteMessage:'Başarıyla Silindi.'    
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalPayment: any;
  customerPaid: any[];
  totalPay: number;
  email: any;
  loginState: { isLoggedIn: boolean; menuTitle: string };
  customerLimit: number;
  data: any;
  message: string = "Limit Aşıldı !";
  setCustomerDebt: Customer;
  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private snackBar:MatSnackBar
  ) {
    this.afAuth.user.subscribe((res) => {
      if (res) {
        this.email = res.email;
      }
    });
    if (this.afAuth.authState) {
      this.loginState = {
        isLoggedIn: true,
        menuTitle: "Müşteri Detay",
      };
    }
  }

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
    this.getCustomers();

    console.log("totalpaid");
    console.log(this.totalPayment);

    console.log(this);
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
        this.totalDebt(customerDebt);
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

  updateDebt(customerId, debtId, data) {
    this.firebaseService.updateDebt(customerId, debtId, data);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { name: "addDebt" };

    let dialogRef = this.dialog.open(DialogAddDebtComponent, dialogConfig);
    console.log(".alıyor");

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       
        this.addDebt(result.value);
        
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

  openUpdateDebtForm(value) {
    console.log(value);
    console.log(this.id);
    const dialogRef = this.dialog.open(DialogAddDebtComponent, {
      data: {
        name: "updateDebt",
        value: value,
        date: value.debtDate.toDate(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.value);
        this.updateDebt(this.id, value.debtId, result.value);
      }
    });
  }

  selectClick(value) {
    this.option = value;
    console.log(value);
    this.updateCustomerTotalDebt()
    
  }

  totalDebt(customerDebt) {
    this.total = 0;
    customerDebt.forEach((debt) => {
      this.total = debt.debtPrice + this.total;
    });
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
        this.customerPaid = customerPaid;
        this.totalPaid();
        this.findLastPaidDate();
      });
  }
  totalPaid() {
    this.totalPay = 0;
    this.customerPaid.forEach((paid) => {
      this.totalPay = Number(paid.debtPrice + this.totalPay);
    });
  }

  findLastDebtDate() {
    this.customerDebt.forEach((debt) => {
      console.log(debt.debtDate);
      const date = debt.debtDate.toDate();
      this.datesDebt.push(date);
      // this.dates.push(debt.debtDate.seconds)
    });
    this.datesDebt.sort((a: number, b: number) => b - a);
    this.datesDebt[0];
    console.log(this.datesDebt[0]);
  }

  findLastPaidDate() {
    this.customerPaid.forEach((paid) => {
      console.log(paid.paymentDate.toDate());
      const date = paid.paymentDate.toDate();
      this.datesPaid.push(date);
      // this.dates.push(debt.debtDate.seconds)
    });
    this.datesPaid.sort((a: number, b: number) => b - a);
    console.log(this.datesPaid);
    this.datesPaid[0];
    console.log(this.datesPaid[0]);
  }

  getCustomers(): any {
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
        this.getCustomerLimit(customers, this.id);
        
        
      });
  }

  getCustomerLimit(documents, id: string) {
    documents.forEach((doc) => {
      if (doc.id === id) {
        this.customerLimit = doc.limit;
      }
    });
  }

  updateCustomerTotalDebt() {
    this.customers.forEach((customer) => {
      if (customer.id === this.id) {
        this.setCustomerDebt = {
          name: customer.name,
          surname: customer.surname,
          adres: customer.adres,
          customerId: customer.customerId,
          phone: customer.phone,
          totalDept: this.total,
          limit: customer.limit,
        };
        console.log(this.setCustomerDebt)
        this.firebaseService.updateCustomer(this.id,this.setCustomerDebt)
      }

    });
  }

  openDeleteSnackBar() {
    
    this.snackBar.open(this.messages.deleteMessage,'', {
      duration: 2000,
      panelClass: ["delete-snackbar"],
    });
  }
}
