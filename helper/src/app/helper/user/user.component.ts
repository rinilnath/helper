import { Component, OnInit } from '@angular/core';
import { UserRequestsService } from '../shared/user-requests.service';
import { NgForm } from '@angular/forms';

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
