import { Component, OnDestroy, OnInit } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';

import { componentProp } from './shared/models/customerModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Bakkal-Application';
 
}
