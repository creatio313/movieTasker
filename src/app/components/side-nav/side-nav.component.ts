import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MovieProcess } from '../../models/movie-process';
import { MovieProcessService } from '../../services/movie-process.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {
  @Input() user;
  @Output() changeProj = new EventEmitter<string>();
  processes: MovieProcess[];
  constructor(private movieProcess:MovieProcessService) { }

  ngOnInit() {
    this.movieProcess.getMovieProcess().subscribe(processes => this.processes = processes);
  }

  onChange(key: string){
    this.changeProj.emit(key);
  }

}
