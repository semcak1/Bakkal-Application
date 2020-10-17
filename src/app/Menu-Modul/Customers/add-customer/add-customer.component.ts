import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FirebaseService } from "src/app/core/firebase.service";
import { componentProp, Customer } from "src/app/shared/models/customerModel";
import { map } from "rxjs/operators";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"],
})
export class AddCustomerComponent implements OnInit {
  len: number;
  componentProp: componentProp;

  constructor(
    @Inject(MAT_DIALOG_DATA)public data,
    private firebaseService: FirebaseService) {
    this.componentProp = {
      menuTitle: "Müşteri Ekle",
      componentName: "login",
      userName: "",
      isLoggedIn: true,
    };
  }

  ngOnInit() {
    console.log(this);
    this.createId();
    console.log(this.len);
  }

  createId() {
    this.firebaseService.getDocuments("Customer").subscribe((res) => {
      this.len = res.length + 1;
    });
  }

  createCustomer(form: NgForm) {
    console.log(form.value);

    const customer: Customer = {
      customerId: '0',
      name: "",
      surname: "",
      totalDept: 0,
      adres: "",
      phone: "",
      limit:0,
    };
    const returnedTarget = Object.assign(customer, form.value);
    this.firebaseService.addCustomer(returnedTarget);
    form.resetForm();
  }
}
