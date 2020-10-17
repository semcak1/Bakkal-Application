import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { Router, Routes } from '@angular/router';
import { CustomersComponent } from '../Menu-Modul/Customers/customers.component';
import { FirebaseService } from './firebase.service';
import { CoreRoutingModule } from './core-routing.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
  ],
  exports:[
    CommonModule,HeaderComponent
  ],
  providers:[AuthService,FirebaseService,AngularFireAuth]

})
export class CoreModule { }
