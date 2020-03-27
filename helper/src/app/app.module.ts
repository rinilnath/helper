import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './helper/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRequestsService } from './helper/shared/user-requests.service';


import { environment } from "src/environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule} from '@angular/fire/firestore/';

import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { AddRequestComponent } from './Components/add-request/add-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from './Services/data.service';


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    AddRequestComponent
=======
    UserComponent
>>>>>>> ff64e20246d98138c0ece3262b8178eb49c949d1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
=======
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [UserRequestsService],
>>>>>>> ff64e20246d98138c0ece3262b8178eb49c949d1
  bootstrap: [AppComponent]
})
export class AppModule { }
