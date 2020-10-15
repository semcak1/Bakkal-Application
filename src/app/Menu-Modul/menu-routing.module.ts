import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './Customers/customers.component';
import { AddCustomerComponent } from './Customers/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './Customers/customer-details/customer-details.component';
import { IncomeExpensesComponent } from '../Income-Expenses/income-expenses.component';
import { IncomeExpnesesFormComponent } from '../Income-Expenses/income-expneses-form/income-expneses-form.component';
import { ShowsIncomeComponent } from '../Income-Expenses/shows-income/shows-income.component';
import { componentFactoryName } from '@angular/compiler';
import { CategoryDetailsComponent } from '../Income-Expenses/category-details/category-details.component';


const routes: Routes = [
  {path:'customers',component:CustomersComponent},
  {path:'customerAdd',component:AddCustomerComponent},
  {path:'customerDetails/:id',component:CustomerDetailsComponent},
  {path:'income-expenses',component:IncomeExpensesComponent},
  {path:'income-form',component:IncomeExpnesesFormComponent},
  {path:'categoryDetails/:id',component:CategoryDetailsComponent}
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],  
  exports: [RouterModule]
})
export class MenuRoutingModule { }
