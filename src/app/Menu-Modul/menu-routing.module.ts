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
import { AuthguardGuard } from '../core/authguard.guard';


const routes: Routes = [
  {path:'customers',component:CustomersComponent,canActivate:[AuthguardGuard]},
  {path:'customerAdd',component:AddCustomerComponent,canActivate:[AuthguardGuard]},
  {path:'customerDetails/:id',component:CustomerDetailsComponent,canActivate:[AuthguardGuard]},
  {path:'income-expenses',component:IncomeExpensesComponent,canActivate:[AuthguardGuard]},
  {path:'income-form',component:IncomeExpnesesFormComponent,canActivate:[AuthguardGuard]},
  {path:'categoryDetails/:id',component:CategoryDetailsComponent,canActivate:[AuthguardGuard]}
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],  
  exports: [RouterModule]
})
export class MenuRoutingModule { }
