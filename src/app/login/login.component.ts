import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { componentProp, ContactRequest } from "../shared/models/customerModel";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  componentProp:componentProp;
  loginForm: FormGroup;
  type:string;
  constructor(private formBuilder:FormBuilder) {
    this.componentProp={
      menuTitle:'Giriş',
      componentName:'login',
      isLoginVisible:true,
      isMenuVisible:false,
      isRegisterVisible:true      
    }
  }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      email:[null,[Validators.required,
        Validators.email]],
      password:[null,[Validators.required,Validators.minLength(4)]]
    })

   
  }

  
  
  isValidInput(fieldName):boolean{
    return this.loginForm.controls[fieldName].invalid && ((this.loginForm.controls[fieldName].dirty) || this.loginForm.controls[fieldName].touched)
  }
 
  register() {
   console.log(this.loginForm.value)
  }

  login(){

  }

  checkName(value){  
    this.type='';  
    this.type=value;    
  }

  onRegsiterButton(){
    this.type=''
    this.type='register'
  }
 
}
