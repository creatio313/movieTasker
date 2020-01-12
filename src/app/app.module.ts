import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FormsModule }   from '@angular/forms';//要らないかも
import { StoreService } from './services/store.service';
import { MovieProcessService } from './services/movie-process.service';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { TodoPipe } from './pipe/todo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TaskViewComponent,
    TodoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),//Angularfireのテストのために付加
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    FormsModule//要らないかも
  ],
  providers: [StoreService, MovieProcessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
