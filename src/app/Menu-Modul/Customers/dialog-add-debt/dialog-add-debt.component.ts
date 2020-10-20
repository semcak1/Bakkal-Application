
import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-add-debt',
  templateUrl: './dialog-add-debt.component.html',
  styleUrls: ['./dialog-add-debt.component.scss'],
  providers:[DatePipe]
})
export class DialogAddDebtComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private snackBar:MatSnackBar) { }

  ngOnInit() {
    // console.log(this.currentDate)
  }

  // newDate= new Date();
  // datePipe=new DatePipe('en-US')
  // currentDate=this.datePipe.transform(this.newDate,'EEEE, MMMM d, y')

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  messages={
    addMessage:'Başarıyla Kaydedildi',
    deletMessage:'Başarıyla Silindi.',
    updateMessage:'Başarıyla Güncellendi.'
  }

  addDebt(form:NgForm){
    console.log(form.value)
  }

  openAddSnackBar() {
    
    this.snackBar.open(this.messages.addMessage,'', {
      duration: 2000,
      panelClass: ["add-snackbar"],
    });
  }
  openDeleteSnackBar() {
    
    this.snackBar.open(this.messages.deletMessage,'', {
      duration: 2000,
      panelClass: ["delete-snackbar"],
    });
  }
  openUpdateSnackBar() {
    
    this.snackBar.open(this.messages.updateMessage,'', {
      duration: 2000,
      panelClass: ["update-snackbar"],
    });
  }
}
