import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRequestsService } from 'src/app/Services/user-requests.service';
import { UserRequest } from 'src/app/Services/userRequest.model';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  list: UserRequest[];
  
  constructor(public userRequest: UserRequestsService) {
  }


  ngOnInit(): void {
    this.resetForm();
    this.userRequest.getRequest().subscribe(actionArray =>{
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ... (item.payload.doc.data()) as UserRequest
        }
      })
    });
  }


  onSubmit(form: NgForm) {
    let data = form.value;
    if (form.valid) {
      //this.userRequest.addRequest(data);
      $('#myModal').modal('show');
      this.resetForm(form);
    } else {
      alert("inputs not valid")
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.userRequest.userRequestFormData = {
      username: "",
      email: "",
      mobile: "",
      district: "",
      taluk: "",
      village: "",
      address: "",
      requiredItem: "",
    }
  }
}
