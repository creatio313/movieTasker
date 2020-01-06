import { Injectable } from '@angular/core';

import { MovieProcess } from '../models/movie-process';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieProcessService {

  constructor(
    private http: HttpClient
  ) {
  }
  getMovieProcess(){
    return this.http.get<MovieProcess[]>('/assets/movieProcess.json');
  }
}
