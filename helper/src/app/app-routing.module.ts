import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerComponent } from './Components/volunteer/volunteer.component';
import { from } from 'rxjs';
//import { AddRequestComponent } from './Components/add-request/add-request.component';


const routes: Routes = [
  //  { path: '', component: AddRequestComponent }
  { path: 'volunteer/register', component: VolunteerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
