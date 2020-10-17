import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { MenuModule } from './Menu-Modul/menu.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { MatDialogModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginDialogComponent } from './login/login-dialog/login-dialog.component';
import { AuthguardGuard } from './core/authguard.guard';



@NgModule({
  declarations: [
    AppComponent,LoginComponent,LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MenuModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatDialogModule
   
  ],
  entryComponents:[LoginDialogComponent],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
