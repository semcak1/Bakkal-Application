import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './Customers/customers.component';
import { AddCustomerComponent } from './Customers/add-customer/add-customer.component';


const routes: Routes = [
  {path:'customers',component:CustomersComponent},
  {path:'customerAdd',component:AddCustomerComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],  
  exports: [RouterModule]
})
export class MenuRoutingModule { }
