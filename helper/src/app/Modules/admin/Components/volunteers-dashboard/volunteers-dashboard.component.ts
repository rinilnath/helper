import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from '../../../user/Services/userRequest.model';

import * as CryptoJS from 'crypto-js';

import { AuthService } from '../../Services/auth.service';
import { DataService } from '../../Services/data.service';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './volunteers-dashboard.component.html',
  styleUrls: ['./volunteers-dashboard.component.css']
})

export class VolunteersDashboardComponent implements OnInit {

  volunteerlist;
  volname;
  volunteerTaskList: UserRequest[]
  totalTaskCount: number
  waitingForAcceptTaskCount: number
  ongoingTaskCount: number
  resetForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  success = '';
  error = ''
  processing = '';


  constructor(private auth: AuthService, private router: Router, private dataservice: DataService) {

    this.dataservice.getVolunteerTaskList(CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8)).subscribe(data => {
      this.volunteerTaskList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as UserRequest
        };
      })
    });
  }

  ngOnInit(): void {
    // this.auth.getUserDetails();
    this.volname = localStorage.getItem("username");
    this.totalTaskCount = this.volunteerTaskList && this.volunteerTaskList.length;

    this.volunteerTaskList && this.volunteerTaskList.forEach(task => {
      if (task.status = 'Assigned') {
        this.waitingForAcceptTaskCount += this.waitingForAcceptTaskCount
      }
      if (task.status = 'Confirmed') {
        this.ongoingTaskCount += this.ongoingTaskCount
      }
    });

    this.dataservice.getVolunteer(CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8)).valueChanges().subscribe(
      res => {
        this.volunteerlist = res;
      }
    )

    // console.log("totalTaskCount", this.totalTaskCount);
    // console.log("waitingForAcceptTaskCount", this.waitingForAcceptTaskCount);
    // console.log("ongoingTaskCount", this.ongoingTaskCount);

  }

  onDone(task) {
    if(confirm("Are you sure the task was completed !")) {
      task.status = 'Done';
      this.volunteerlist.requestId = this.volunteerlist.requestId.replace(task.id + ", ", "");
      this.dataservice.updateVolunteer(CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8), this.volunteerlist)
      this.dataservice.updateTaskStatus(task);
    }
  }

  onAccept(task) {
    task.status = 'Confirmed';
    this.dataservice.updateTaskStatus(task);
  }

  onRejected(task) {
    task.description = prompt("Reason For Rejection")
    if (task.description) {
      task.status = 'Rejected';
      this.volunteerlist.requestId = this.volunteerlist.requestId.replace(task.id + ", ", "");
      this.dataservice.updateVolunteer(CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8), this.volunteerlist)
      this.dataservice.updateTaskStatus(task);
    } else {
      toastr.error("Please provide reason for rejection")
    }
  }
  onNotDone(task) {
    task.description = prompt("Please provide reason")
    if (task.description) {
      task.status = 'Not Done';
      this.volunteerlist.requestId = this.volunteerlist.requestId.replace(task.id + ", ", "");
      this.dataservice.updateVolunteer(CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8), this.volunteerlist)
      this.dataservice.updateTaskStatus(task);
    } else {
      toastr.error("Please provide reason")
    }
  }

  signout() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  onSubmit() {
    this.error = '',
      this.success = ''
    if (!this.resetForm.invalid) {
      this.processing = 'Resetting ..';
      this.dataservice.restPassword(CryptoJS.AES.decrypt(localStorage.getItem("userId"), "akalgorija").toString(CryptoJS.enc.Utf8), CryptoJS.AES.encrypt(this.resetForm.value.password, "akalgorija").toString()).then(data => {
        this.success = 'Successfully reset the password'
        this.processing = ''
      }).catch(data => {
        this.processing = ""
        console.log(data)
        this.error = data.message
        $('#myModal').modal('show');
      })
    }
    else {
      this.error = "All fields are required"
      console.log(this.error)
      $('#myModal').modal('show');
    }
  }

}
