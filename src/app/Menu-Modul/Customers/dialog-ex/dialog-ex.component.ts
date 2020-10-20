import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-ex',
  templateUrl: './dialog-ex.component.html',
  styleUrls: ['./dialog-ex.component.scss']
})
export class DialogExComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private snackBar:MatSnackBar) { }
  messages={
    deletMessage:'Başarıyla Silinidi.'
  }
  ngOnInit() {
  }

  openDeleteSnackBar() {
    
    this.snackBar.open(this.messages.deletMessage,'', {
      duration: 2000,
      panelClass: ["delete-snackbar"],
    });
  }
}
