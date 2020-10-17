import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { LoginDialogComponent } from "src/app/login/login-dialog/login-dialog.component";
import { AuthService } from "../auth.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Output() type = new EventEmitter();
  name: string;

  @Input() menuTitle;
  @Input() isLoggedIn;

  @Input() userEmail;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  login() {
    this.name = "login";
    this.type.emit(this.name);
  }

  register() {
    this.name = "register";
    this.type.emit(this.name);
  }

  signOut() {
    this.authService
      .signOut()
      .then((resolve) => {
        let message = "Güle Güle Tekrar Bekleriz.";
        this.openSnackBar(message, "success");
      })
      .catch((err) => {
        let message = "Oooppss  Beklenmeyen bir hata oluştu.";
        this.openSnackBar(message, "success");
      });
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
