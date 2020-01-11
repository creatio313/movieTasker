import { Component, OnInit, Input } from '@angular/core';
import { Scene } from 'src/app/models/scene';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.sass']
})
export class TaskViewComponent implements OnInit {
  @Input() scenes: Scene[];
  @Input() selected;
  todoList: Scene[];
  doneList: Scene[];
  constructor() { }

  ngOnInit() {
  }

}
