import { Component } from '@angular/core';

//angularfireテスト用
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { project } from './project';

export class project{
  ProjectName: String;
  owner: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  projectCollection : AngularFirestoreCollection<project>;
  docs: Observable<project[]>
  constructor(private db: AngularFirestore) {
  }
  ngOnInit(){
    this.projectCollection = this.db.collection('Projects');
    this.docs = this.projectCollection.valueChanges();
  }
  title = 'movieTasker';
}
