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
//Angularfireのテストのために付加
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FormsModule }   from '@angular/forms';
import { StoreService } from './services/store.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,//AngularMaterialテストのために付加
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),//Angularfireのテストのために付加
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    FormsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
