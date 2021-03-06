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
  /**
   * ユーザーを返却する。
   */
  getUser(): Observable<User>{
    return this.user;
  }
  /**
   * 指定されたプロジェクトを返却する。
   * @param proj プロジェクト名称
   */
  getProject(proj: string){
    this.projectCollection = this.userDoc.collection(proj);
  }
  /**
   * プロジェクトを追加し、初期値のシーンを追加する。
   * @param name プロジェクト名称
   */
  addProject(name: string){
    name = name.trim();
    if(name == null || name == "")return;
    let obj = {};
    let id = this.db.createId();
    obj["projects." + id] = name;
    this.userDoc.update(obj);//要リファクタリング
    this.mp.getMovieProcess().subscribe(processes => {
      this.makeEmptyScene(this.userDoc.collection(id), processes, "シーン１");
    })
  }
  /**
   * コレクションを削除する。
   * コレクションの削除は時間を要するため、インデックスを削除し、のちにサーバー側で削除する。
   * @param id インデックスID
   */
  deleteProject(id: string){
    this.userDoc.get().subscribe(
      user => {
        let list = user.data().projects;
        delete list[id]
        this.userDoc.update({projects: list});
      }
    )
  }
  /**
   * プロジェクトにシーンを追加する。
   * @param proj プロジェクトID
   * @param name シーン名称
   */
  addScene(proj: string,name: string){
    let col = this.userDoc.collection<Scene>(proj);
    name = name.trim();
    if(name == null || name == "")return;
    this.mp.getMovieProcess().subscribe(processes => {
      this.makeEmptyScene(col, processes, name);
    });
  }
  /**
   * プロジェクト下のシーン一覧を取得する。
   * @param proj 
   */
  getScene(proj: string){
    let project = this.userDoc.collection<Scene>(proj);
    return project.valueChanges();
  }
  changeScene(proj: string, oldNm: string, newNm: string){
    let col = this.userDoc.collection<Scene>(proj);
    this.searchScene(col, oldNm).then(id => col.doc(id).update({name: newNm}));
  }
    /**
   * プロジェクト内の指定されたシーンを削除する。
   * @param name シーン名称
   */
  deleteScene(proj: string, name: string){
    let project = this.userDoc.collection<Scene>(proj);
    this.searchScene(project, name).then(id => project.doc(id).delete());
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
  /**
   * 初期化されたシーンを作成する。
   * @param col プロジェクトのコレクション
   * @param processes 工程のリスト
   * @param name シーン名称
   */
  makeEmptyScene(col: AngularFirestoreCollection<Scene>, processes: MovieProcess[], name: string){
    col.doc(this.db.createId()).set(
      processes
      .map(pro => pro.id)
      .reduce<Object>((obj, id) => {
          obj[id] = false;
          return obj;
        }, {name: name,date: new Date(),prefecture: "JP-13"}
      )
    )
  }
  /**
   * シーンの工程の未了・完了を切り替える。
   * @param proj プロジェクトのコレクション
   * @param scene シーン名称
   * @param col 項目名
   * @param val 真偽値
   */
  toggleTodo(proj: string, scene: string, col: string, val: boolean){
    let collection = this.userDoc.collection<Scene>(proj);
    let obj = {};
    obj[col] = val;
    this.searchScene(collection, scene).then(
      id => {
        collection.doc(id).update(obj);
      }
    );
  }
  registPlan(proj: string, scene: Scene){
    let col = this.userDoc.collection<Scene>(proj);
    this.searchScene(col, scene.name).then(
      id => {
        col.doc(id).update(
          {
            date: scene.date,
            prefecture: scene.prefecture
          }
        )
      }
    )
  }
}
