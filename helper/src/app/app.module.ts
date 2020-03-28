import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { environment } from "src/environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore/';

//services
import { UserRequestsService } from './Services/user-requests.service';
import { VolunteerRequestsService } from './Services/volunteer-requests.service';

//components
import { UserComponent } from './Components/user/user.component';
import { VolunteerComponent } from './Components/volunteer/volunteer.component';

import { from } from 'rxjs';




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    VolunteerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserRequestsService, VolunteerRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
