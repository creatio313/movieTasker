import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieProcess } from 'src/app/models/movie-process';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {
  @Input() user;
  @Input() processes:MovieProcess[];
  @Output() changeProj = new EventEmitter<string>();
  @Output() selectProc = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onChange(key: string){
    this.changeProj.emit(key);
  }
  onClick(key: string){
    this.selectProc.emit(key);
  }

}
