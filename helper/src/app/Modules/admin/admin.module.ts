import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './Components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { AuthService } from './Services/auth.service';
import { DataService } from './Services/data.service';
import { AddVolunteersComponent } from './Components/add-volunteers/add-volunteers.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { VolunteersDashboardComponent } from './Components/volunteers-dashboard/volunteers-dashboard.component';
import { AdminGuard } from './admin.guard';
import { ValreplacingPipe } from './valreplacing.pipe';
import { ComareplacingPipe } from './comareplacing.pipe';
import { ReqreplacingPipe } from './reqreplacing.pipe';



@NgModule({
  declarations: [
    RegisterComponent, 
    DashboardComponent, 
    SignInComponent, 
    AddVolunteersComponent, 
    NavbarComponent, 
    VolunteersDashboardComponent,
    ValreplacingPipe,    
    ComareplacingPipe, ReqreplacingPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,    
  ],
  providers: [
    AuthService,
    DataService,
    AdminGuard
  ],
  exports: [
    AppRoutingModule
  ]
})
export class AdminModule { }
