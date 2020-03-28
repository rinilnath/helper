import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './Components/user/user.component';


const routes: Routes = [
 { path: 'user', component: UserComponent },
 { path:'admin' ,  loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule)},
 {path:'',redirectTo:'user',pathMatch:"full"}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
