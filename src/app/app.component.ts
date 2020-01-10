import { Component } from '@angular/core';

import { User } from './models/user';
import { Scene } from './models/scene';
import { StoreService } from './services/store.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  userID: String = "creatio313";

  user: User;
  scenes: Scene[];
  data: Number = 20;
  

  title = 'MovieTasker';

  constructor(
    private store:StoreService,
    
    private matSnackBar:MatSnackBar
    ) {
  }
  ngOnInit(){
    this.store.getUser().subscribe(user => this.user = user);
    this.store.getScene().subscribe(scenes => this.scenes = scenes.sort((a,b)=> {if(a.name>b.name){return 1}return -1}));
  }

  add(name: string){
    if(!this.scenes.find(scene => scene.name == name)){
      this.store.addScene(name)
    }else{
      this.matSnackBar.open("すでに同名のシーンが存在します。","",{duration: 1500});
    };
  }
  delete(name: string){
    this.store.deleteScene(name);
  }
}
