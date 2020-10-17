import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { componentProp } from '../shared/models/customerModel';

@Component({
  selector: 'income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.scss']
})
export class IncomeExpensesComponent implements OnInit {
  email: string;
  loginState:componentProp;

  constructor(private afAuth:AngularFireAuth) { 
    this.afAuth.user.subscribe((res) => {
      if (res) {
        this.email = res.email;
      }
    });
    if(this.afAuth.authState){
      this.loginState = {
        isLoggedIn: true,
        menuTitle: "Gelir - Gider",
      };
    }
  }

  ngOnInit() {
  }

}
