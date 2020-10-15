import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';





@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  @Output() type=new EventEmitter();
  name:string;

  @Input() menuTitle;
  @Input() isLoginVisible;
  @Input() isMenuVisible;
  @Input() isRegisterVisible;
  constructor() { }

  ngOnInit() {
  }

  login(){
    this.name='login'
     this.type.emit(this.name)
  }

  register(){
    this.name='register'
     this.type.emit(this.name
      )
  }

}
