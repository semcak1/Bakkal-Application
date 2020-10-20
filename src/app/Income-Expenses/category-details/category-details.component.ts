import { Component, OnInit, ViewChild } from "@angular/core";
import { FirebaseService } from "src/app/core/firebase.service";
import { map } from "rxjs/operators";
import { componentProp, Income } from "src/app/shared/models/customerModel";
import { ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { CategoriAddFormComponent } from "../categori-add-form/categori-add-form.component";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"],
})
export class CategoryDetailsComponent implements OnInit {
  tables: string[];
  subCategory: string;
  subCategories: any[];
  incomes: any[];
  id: string;
  category: string;
  toggle: boolean = false;
  displayedColumns: string[] = ["gider", "tarih", "işlemler"];
  lastOperationDates: any[];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  email: string;
  loginState: componentProp;
  lastDate: any;
  totalIncExp: any;
  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
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
        menuTitle: "Gelir - Gider Detay",
      };
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      console.log(query);
      this.category = query.category;
    });

    this.route.paramMap.subscribe((params) => {
      console.log(params.get("id"));
      this.id = params.get("id");
    });
    this.getSubCategory();
    console.log(this.tables);
  }

  getSubCategory() {
    //
    this.firebaseService
      .getIncomesCategory()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              incomeId: c.payload.doc.id,
              ...(c.payload.doc.data() as Income),
            };
          })
        )
      )
      .subscribe((incomes) => {
        console.log(incomes);
        this.incomes = incomes;
        incomes.forEach((income) => {
          if (income.incomeId === this.id) {
            console.log(income.subCategory);
            this.tables = income.subCategory;
            console.log(this.tables);
          }
        });

        // this.dataSource = new MatTableDataSource(this.incomes);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectClick(value) {
    this.subCategory = value;
    console.log(value);
    this.toggle = true;
    this.getIncomeExpense();
  }

  openIncomeDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.height = "75%";
    dialogConfig.data = {
      name: "incomeDetailForm",
    };
    let dialogRef = this.dialog.open(CategoriAddFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.value);
        this.addIncomeExpense(result.value);
      }
    });
  }

  getIncomeExpense() {
    this.firebaseService
      .getIncomeExpense(this.id, this.subCategory)
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              incExpId: c.payload.doc.id,
              ...(c.payload.doc.data() as {}),
            };
          })
        )
      )
      .subscribe((subCategories) => {
        console.log(subCategories);
        this.subCategories = subCategories;
        this.findLastEnteredData(this.subCategories);
        this.totalIncomeExpense(this.subCategories);
        this.dataSource = new MatTableDataSource(this.subCategories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  addIncomeExpense(data) {
    this.firebaseService.addIncomeExpense(this.id, this.subCategory, data);
  }

  deleteIncomeExpense(data) {
    console.log(this.id);
    console.log(this.subCategory);
    console.log(data);
    this.firebaseService.deleteIncomeExpense(
      this.id,
      this.subCategory,
      data.incExpId
    );
  }
/*Güncelleme Formunu açar ve forma gelen değerleri value ile alır.*/
  openDialogUpdateIncomeExpense(value) {
    let dialogRef = this.dialog.open(CategoriAddFormComponent, {
      data: {
        name: "updateIncomeExpense",
        income: value.income,
        date: value.date.toDate(),
      },
    });
    this.getUpdatedIncomeExpenseResult(dialogRef,value.incExpId)
  }
/*güncelleme formundaki bilgileri ve güncellenen harcamanın idsini alır*/
  getUpdatedIncomeExpenseResult(formData,incExpId){
    formData.afterClosed().subscribe(result=>{
      if(result){
             console.log(result.value)
      this.updateIncomeExpense(this.id,this.subCategory,incExpId,result.value)
      }
 
    })
  }
/*kategori id  harcama yada gelir in ismini ve bu isme bağlı olan harcamanın id sini ve güncellme form datasını alır firebase gönderir.*/
  updateIncomeExpense(categoryId,IncomeExpenseName,IncomeExpenseId,data){
    this.firebaseService.updateIncomeExpense(categoryId,IncomeExpenseName,IncomeExpenseId,data)
  }

  findLastEnteredData(IncExpData) {
    this.lastOperationDates = [];
    IncExpData.forEach((data) => {
      if (data.date) {
        this.lastOperationDates.push(data.date);
      }
    });
    this.lastOperationDates.sort((a, b) => {
      return b - a;
    });
    if (this.lastOperationDates.length !== 0) {
      this.lastDate = this.lastOperationDates[0].toDate();
    }
  }

  totalIncomeExpense(IncExpData) {
    this.totalIncExp = 0;
    IncExpData.forEach((data) => {
      this.totalIncExp = data.income + this.totalIncExp;
    });
  }
}
