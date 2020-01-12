import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TaskViewComponent } from './components/task-view/task-view.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  //{path: 'tasks:key', component: TaskViewComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
