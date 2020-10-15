import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "categori-add-form",
  templateUrl: "./categori-add-form.component.html",
  styleUrls: ["./categori-add-form.component.scss"],
})
export class CategoriAddFormComponent implements OnInit {
  public subCategories: any[] 
  date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.selectSubCategory();
  }

  addInput() {
    this.subCategories.push({
      name: "",
    });

    // this.subCategories.push(value);
    // console.log('inpıuttan sonra')
    console.log(this.subCategories);
    //name key li array in adı subCategory olacak
    //
  }

  deleteInput() {
    let len = this.subCategories.length - 1;
    this.subCategories.splice(len, 1);
  }

  selectSubCategory(){
    this.subCategories =[]     
    if(this.data.name=="update"){
      console.log((this.data.subCategory))
      this.data.subCategory.forEach(subC=>{
        this.subCategories.push(
          {
            name:subC
          }
        )
      })
      
      console.log(this.subCategories)
    }else{
      this.subCategories =[
        {
          name: "",
        }
      ]               
    }
  }
}
