import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Project } from '../models/project';
import { Scene } from '../models/scene';
import { MovieProcessService } from './movie-process.service'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //userDocument : AngularFirestoreDocument<User>;
  user: Observable<User>;
  projectCollection : AngularFirestoreCollection<Project>;
  constructor(
      private db: AngularFirestore,
      private mp: MovieProcessService
    ) {
    this.user = db.doc<User>('Users/creatio313').valueChanges();
  }
  getUser(): Observable<User>{
    return this.user;
  }
  getProject(projectKey: string){
    this.projectCollection = this.db.collection('Users/creatio313/TestProject');
  }
  addScene(name: string){
    name = name.trim();
    if(name == null || name == "")return;
    this.mp.getMovieProcess().subscribe(processes => {
      this.db.collection('Users/creatio313/TestProject').doc(name).set(
        processes
        .map(pro => pro.id)
        .reduce<Object>((obj, id) => {
            obj[id] = false;
            return obj;
          }, {name: name}
        )
      )
    })
  }
  deleteScene(name: string){
    this.db.doc(`Users/creatio313/TestProject/${name}`).delete();
  }
  getSchene(){
    return this.db.collection<Scene>('Users/creatio313/TestProject').valueChanges();
  }
}
