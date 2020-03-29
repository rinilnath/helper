import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestsService } from './Services/user-requests.service';
import { UserComponent } from 'src/app/Modules/user/Component/user/user.component';
import { NavbarComponent } from 'src/app/Modules/user/Component/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore/';



@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,          
    ReactiveFormsModule,  
    FormsModule,
  ],
  providers: [UserRequestsService],
})
export class UserModule {}
