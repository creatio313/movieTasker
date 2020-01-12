import { Component } from '@angular/core';

import { User } from './models/user';
import { Scene } from './models/scene';
import { StoreService } from './services/store.service';

import { MovieProcess } from './models/movie-process';
import { MovieProcessService } from './services/movie-process.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  userID: String = "creatio313";
  currentProject: string = "";
  selected: string = "";
  selectedJP: string = "";

  user: User;
  scenes: Scene[];
  
  processes: MovieProcess[];

  title = 'MovieTasker';

  constructor(
    private store:StoreService,
    private movieProcess:MovieProcessService
  ) {
  }
  ngOnInit(){
    this.store.getUser().subscribe(user => this.user = user);
    this.movieProcess.getMovieProcess().subscribe(processes => this.processes = processes);
  }

  setProject(proj: string){
    this.currentProject = proj;
    this.store.getScene(this.currentProject).subscribe(scenes => this.scenes = scenes.sort((a,b)=> {if(a.name>b.name){return 1}return -1}));
  }

  add(name: string){
    this.store.addScene(this.currentProject,name)
  }
  delete(name: string){
    this.store.deleteScene(this.currentProject,name);
  }
  addProject(name: string){
    this.store.addProject(name);
  }
  deleteProject(id: string){
    this.store.deleteProject(id);
  }

  selectProcess(key: string){
    this.selected = key;

    //暫定
    if(key != 'registPlan')this.selectedJP = this.processes.filter(data => data.id == key)[0].name;
  }
  changeSceneName(arr: string[]){
    let oldNm = arr[0];
    let newNm = arr[1];
    this.store.changeScene(this.currentProject, oldNm, newNm);
  }
  clear(){
    this.selected="";
  }
}
