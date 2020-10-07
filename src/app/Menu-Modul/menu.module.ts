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

SharedModule

@NgModule({
  declarations: [
    MenuComponent,CustomersComponent, AddCustomerComponent,  DialogExComponent
  ],
  imports: [
    CommonModule,MenuRoutingModule,CoreModule,SharedModule,MatDialogModule
  ],
  exports:[
    MatDialogModule
  ],
  entryComponents:[DialogExComponent]
})
export class MenuModule { }
