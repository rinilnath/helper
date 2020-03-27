import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UserRequestsService } from 'src/app/Services/user-requests.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public userRequest: UserRequestsService) {
  }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    this.userRequest.addRequest(data);
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
