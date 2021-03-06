import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AddVolunteersComponent } from './Components/add-volunteers/add-volunteers.component';
import { VolunteersDashboardComponent } from './Components/volunteers-dashboard/volunteers-dashboard.component';
import { AdminGuard } from './admin.guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['admin/login']);


const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'login', component: SignInComponent,},
  { path: 'dash', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'addvolunteer', component: AddVolunteersComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'volunteer', component: VolunteersDashboardComponent, canActivate: [AdminGuard], },
  { path: '', redirectTo: 'dash', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
