import { Component, OnInit, ViewChild } from "@angular/core";
import { FirebaseService } from "src/app/core/firebase.service";
import { map } from "rxjs/operators";
import { Income } from "src/app/shared/models/customerModel";
import { ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { CategoriAddFormComponent } from "../categori-add-form/categori-add-form.component";

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
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

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
      
      if(result){
        console.log(result.value);
        this.addIncomeExpense(result.value);
      }
     
    });
  }

  addIncomeExpense(data) {
    this.firebaseService.addIncomeExpense(this.id, this.subCategory, data);
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
        this.dataSource = new MatTableDataSource(this.subCategories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
