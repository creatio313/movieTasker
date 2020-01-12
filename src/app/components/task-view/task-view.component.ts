import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scene } from 'src/app/models/scene';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.sass']
})
export class TaskViewComponent implements OnInit {
  @Input() scenes: Scene[];
  @Input() selected;
  @Input() project: string;
  todoList: Scene[];
  doneList: Scene[];

  constructor(
    private store: StoreService
  ) { }

  ngOnInit() {
  }
  toggleTodo(sceneName: string, val: boolean){
    this.store.toggleTodo(this.project, sceneName, this.selected, val);
  }
}