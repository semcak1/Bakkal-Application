import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { Router, Routes } from '@angular/router';
import { CustomersComponent } from '../Menu-Modul/Customers/customers.component';
import { FirebaseService } from './firebase.service';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    
  ],
  exports:[
    CommonModule,HeaderComponent
  ],
  providers:[AuthService,FirebaseService]

})
export class CoreModule { }
