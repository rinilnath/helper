import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequestComponent } from './Components/add-request/add-request.component';


const routes: Routes = [{ path: '', component: AddRequestComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
