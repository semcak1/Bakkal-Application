import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Income } from 'src/app/shared/models/customerModel';

@Component({
  selector: 'income-expneses-form',
  templateUrl: './income-expneses-form.component.html',
  styleUrls: ['./income-expneses-form.component.scss']
})
export class IncomeExpnesesFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  incomeList:Income[]=[
    {
      category:"Ciro",
      subCategory:[],
      incomeType:true
    },
    {
      category:"Sigara",
      subCategory:["Philip Morris","Japan Tobacco","British Tobacco","Europan Tobacco","Polo-West"],
      incomeType:false
    },
    {
      category:"Toptancı",
      subCategory:["Zırhlıoğlu","Özbereket","Mega-Center","Rami","Süleyman","Bolulu","Turşucu","Yumurta-Sedat","Yumurta-Furkan","Hırdavatçı"],
      incomeType:false
    },
    {
      category:"İçecekler",
      subCategory:["Pepsi","Coca-Cola","Anadolu-Gıda"],
      incomeType:false
    }
  ]
  onFormSubmit(form:NgForm){
    console.log(form.value)
        
    form.resetForm();
  }
}
