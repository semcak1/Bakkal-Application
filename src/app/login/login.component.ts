import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { AuthService } from "../core/auth.service";
import { componentProp, ContactRequest } from "../shared/models/customerModel";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { FirebaseAuth } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  componentProp: componentProp;
  loginForm: FormGroup;
  type: string;
  errorMessage: string;
  successMessage: string;
  userEmail: string;
  isLoggedIn: boolean;
  hide=true;
  userData: firebase.User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.componentProp = {
      menuTitle: "Giriş",
      componentName: "login",
      userName: "",
      isLoggedIn: false,
    };
    if (this.afAuth.authState) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
   
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  isValidInput(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }

  register() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    //kullanıcıyı kaydet
    this.authService.doRegister(this.loginForm.value).then(
      (res) => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Hesabınız oluşturuldu.";
        this.openSnackBar(this.successMessage,'success')
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
        this.openSnackBar(this.errorMessage,'error')
      }
    );
  }

  loginWithEmail() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid) {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          //save to localstorage
         this.authService.saveToLocalStorage(res.user)
         //---------
          console.log(res.user);
          this.userEmail = res.user.email;
          console.log(this.userEmail);
          this.successMessage = "Başarıyla Giriş yaptınız.";
          this.openSnackBar(this.successMessage, "success");
          this.router.navigate(["/customers"]);
        })
        .catch((err) => {
          console.log(err);
          var errorCode = err.code;

          if (errorCode === "auth/wrong-password") {
            let errorMessage = "Parola Hatalı";
            this.openSnackBar(errorMessage, "error");
          } else if (errorCode === "auth/user-not-found") {
            let errorMessage = "Böyle bir kullanıcı yok. Kayıt olunuz.";
            this.openSnackBar(errorMessage, "error");
          } else if (errorCode === "auth/invalid-email") {
            let errorMessage =
              "Geçersiz mail adresi. Lütfen geçerli bir adres giriniz.";
            this.openSnackBar(errorMessage, "error");
          }else if(errorCode==="auth/email-already-in-use"){
            let errorMessage="Bu hesap şu an kullanımda"
            this.openSnackBar(errorMessage,'error')
          }
        });
    }
  }

  checkName(value) {
    this.type = "";
    this.type = value;
  }

  onRegsiterButton() {
    this.type = "";
    this.type = "register";
  }
  //snakcBar
  openSnackBar(message: string, name: string, duration: number = 3) {
    const snackConfig = new MatSnackBarConfig();
    snackConfig.data = {
      name: name,
      message: message,
    };
    snackConfig.duration = duration * 1000;

    this.snackBar.openFromComponent(LoginDialogComponent, snackConfig);
  }
}
