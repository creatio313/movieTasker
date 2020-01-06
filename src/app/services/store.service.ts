import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Project } from '../models/project';
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
    obj:Object;
    this.mp.getMovieProcess().subscribe(processes => {
      this.db.collection('Users/creatio313/TestProject').doc(name).set(
        Array.from(processes)
        .map(pro => pro.id)
        .reduce<Object>((obj, id) => {
            obj[id] = false;
            return obj;
          }, {}
        )
      )
    })
  }
}
