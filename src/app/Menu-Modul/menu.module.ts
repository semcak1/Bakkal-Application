import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './Customers/customers.component';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
SharedModule

@NgModule({
  declarations: [
    MenuComponent,CustomersComponent
  ],
  imports: [
    CommonModule,MenuRoutingModule,CoreModule,SharedModule
  ],
  exports:[
   
  ]
})
export class MenuModule { }
