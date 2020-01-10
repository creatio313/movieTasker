import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Project } from '../models/project';
import { Scene } from '../models/scene';
import { MovieProcessService } from './movie-process.service'
import { MovieProcess } from '../models/movie-process';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private userDoc: AngularFirestoreDocument<User>
  user: Observable<User>;
  projectCollection : AngularFirestoreCollection<Project>;
  constructor(
      private db: AngularFirestore,
      private mp: MovieProcessService
  ) {
    this.userDoc = db.doc<User>('Users/creatio313');
    this.user = this.userDoc.valueChanges();
  }
  getUser(): Observable<User>{
    return this.user;
  }
  getProject(projectKey: string){
    this.projectCollection = this.userDoc.collection('TestProject');
  }
  addScene(name: string){
    let col = this.userDoc.collection<Scene>('TestProject');

    name = name.trim();
    if(name == null || name == "")return;
    this.mp.getMovieProcess().subscribe(processes => {
      this.makeEmptyScene(col, processes, name);
    });
  }
  makeEmptyScene(col: AngularFirestoreCollection<Scene>, processes: MovieProcess[], name: string){
    col.doc(this.db.createId()).set(
      processes
      .map(pro => pro.id)
      .reduce<Object>((obj, id) => {
          obj[id] = false;
          return obj;
        }, {name: name}
      )
    )
  }
  addProject(name: string){
    name = name.trim();
    if(name == null || name == "")return;
    let obj = {};
    let id = this.db.createId();
    obj["projects." + id] = name;
    this.db.doc('Users/creatio313').update(obj);
    this.mp.getMovieProcess().subscribe(processes => {
      this.makeEmptyScene(this.userDoc.collection(id), processes, "シーン１");
    })
  }
  /**
   * プロジェクト内の指定されたシーンを削除する。
   * @param name シーン名称
   */
  deleteScene(name: string){
    let project = this.userDoc.collection<Scene>('TestProject');
    this.searchScene(project, name).then(id => project.doc(id).delete());
  }
  getScene(){
    let project = this.userDoc.collection<Scene>('TestProject');
    return project.valueChanges();
  }
  /**
   * プロジェクト内のシーンを検索し、IDを返却する。
   * @param col プロジェクトコレクション
   * @param name シーン名称
   */
  searchScene(col: AngularFirestoreCollection<Scene>, name: string): Promise<string>{
    return col.ref.where('name', '==', name).get().then(
      scene => {
        //シーン件数が規定外の場合、コンソールに出力する。
        if(scene.empty || scene.size > 1){
          throw `シーン件数が規定外です。　シーン件数：${scene.size}`;
        }
        //ドキュメントのIDを返却する。
        return scene.docs[0].id;
      }
    ).catch(err => {
      console.log("シーンの取得中にエラーが発生しました。", err);
      throw new Error;
    });
  }
}
