import { Component } from '@angular/core';

import { User } from './models/user';
import { Scene } from './models/scene';
import { MovieProcess } from './models/movie-process';
import { StoreService } from './services/store.service';
import { MovieProcessService } from './services/movie-process.service';

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
  processes: MovieProcess[];
  scenes: Scene[];
  data: Number = 20;
  

  title = 'MovieTasker';

  constructor(
    private store:StoreService,
    private movieProcess:MovieProcessService) {
  }
  ngOnInit(){
    this.store.getUser().subscribe(user => this.user = user);
    this.store.getScene().subscribe(scenes => this.scenes = scenes);
    this.movieProcess.getMovieProcess().subscribe(processes => this.processes = processes);
  }

  add(name: string){
    if(!this.scenes.find(scene => scene.name == name)){
      this.store.addScene(name)
    }else{
      console.log("すでに同名のシーンが存在します。");//試験用
    };
  }
  delete(name: string){
    this.store.deleteScene(name);
  }
}
