import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './Customers/customers.component';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AddCustomerComponent } from './Customers/add-customer/add-customer.component';

import { MatDialogModule } from '@angular/material';
import { DialogExComponent } from './Customers/dialog-ex/dialog-ex.component';
import { CustomerDetailsComponent } from './Customers/customer-details/customer-details.component';
import { DialogAddDebtComponent } from './Customers/dialog-add-debt/dialog-add-debt.component';

SharedModule

@NgModule({
  declarations: [
    MenuComponent,CustomersComponent, AddCustomerComponent,  DialogExComponent, CustomerDetailsComponent, DialogAddDebtComponent
  ],
  imports: [
    CommonModule,MenuRoutingModule,CoreModule,SharedModule,MatDialogModule
  ],
  exports:[
    MatDialogModule
  ],
  entryComponents:[DialogExComponent,DialogAddDebtComponent]
})
export class MenuModule { }
