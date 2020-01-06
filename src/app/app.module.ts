import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//AngularMaterialテストのために付加
import { MatSliderModule } from '@angular/material/slider';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FormsModule }   from '@angular/forms';//要らないかも
import { StoreService } from './services/store.service';
import { MovieProcessService } from './services/movie-process.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,//AngularMaterialテストのために付加
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),//Angularfireのテストのために付加
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    FormsModule//要らないかも
  ],
  providers: [StoreService, MovieProcessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
