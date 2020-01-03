import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //userDocument : AngularFirestoreDocument<User>;
  user: Observable<User>
  projectCollection : AngularFirestoreCollection<Project>;
  constructor(private db: AngularFirestore) {
    this.user = db.doc<User>('Users/creatio313').valueChanges();
  }
  getUser(): Observable<User>{
    return this.user;
  }
  getProject(projectKey: String){
    this.projectCollection = this.db.collection('Users/creatio313/TestProject');
  }
}
