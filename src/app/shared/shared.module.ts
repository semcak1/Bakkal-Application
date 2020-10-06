import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
