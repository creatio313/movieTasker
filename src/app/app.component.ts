import { Component } from '@angular/core';

import { User } from './models/user';
import { StoreService } from './services/store.service'

class project{
  ProjectName: String;
  owner: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  userID: String = "creatio313";

  user: User;
  data: Number = 20;
  

  title = 'MovieTasker';

  constructor(private store:StoreService) {
  }
  ngOnInit(){
    this.store.getUser().subscribe(user => this.user = user);
  }

}
