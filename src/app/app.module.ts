import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//AngularMaterialテストのために付加
import { MatSliderModule } from '@angular/material/slider';
//Angularfireのテストのために付加
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { StoreService } from './services/store.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,//AngularMaterialテストのために付加
    AngularFireModule.initializeApp(environment.firebase),//Angularfireのテストのために付加
    AngularFirestoreModule // imports firebase/firestore, only needed for database features
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
