import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'categori-add-form',
  templateUrl: './categori-add-form.component.html',
  styleUrls: ['./categori-add-form.component.scss']
})
export class CategoriAddFormComponent implements OnInit {

  public subCategories:any[]=[{
    name:''
  }];
  date=new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  addInput(){
   this.subCategories.push({
    name:''
   })
   
    // this.subCategories.push(value);
    // console.log('inpıuttan sonra')
    console.log(this.subCategories)
    //name key li array in adı subCategory olacak
    //
  }
}
