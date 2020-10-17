
import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-add-debt',
  templateUrl: './dialog-add-debt.component.html',
  styleUrls: ['./dialog-add-debt.component.scss'],
  providers:[DatePipe]
})
export class DialogAddDebtComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    // console.log(this.currentDate)
  }

  // newDate= new Date();
  // datePipe=new DatePipe('en-US')
  // currentDate=this.datePipe.transform(this.newDate,'EEEE, MMMM d, y')

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  addDebt(form:NgForm){
    console.log(form.value)
  }
}
