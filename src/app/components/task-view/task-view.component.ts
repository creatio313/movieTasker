import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.sass']
})
export class TaskViewComponent implements OnInit {
  @Input() scenes;
  @Input() selected;
  constructor() { }

  ngOnInit() {
    
  }

}
