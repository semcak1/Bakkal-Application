import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { auth } from 'firebase';
import { AuthguardGuard } from './core/authguard.guard';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './Menu-Modul/Customers/customers.component';
import { MenuComponent } from './Menu-Modul/menu.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent,},
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
