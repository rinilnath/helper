import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { AddRequestComponent } from './Components/add-request/add-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from './Services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    AddRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
