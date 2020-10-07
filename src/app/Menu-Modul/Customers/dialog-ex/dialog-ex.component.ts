import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-ex',
  templateUrl: './dialog-ex.component.html',
  styleUrls: ['./dialog-ex.component.scss']
})
export class DialogExComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
