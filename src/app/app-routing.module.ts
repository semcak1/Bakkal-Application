import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './Menu-Modul/Customers/customers.component';
import { MenuComponent } from './Menu-Modul/menu.component';

const routes: Routes = [
  {path:'',redirectTo:'/menu',pathMatch:'full'},
  {path:'menu',component:MenuComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
