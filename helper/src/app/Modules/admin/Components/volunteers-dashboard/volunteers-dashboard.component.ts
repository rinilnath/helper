import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs';
import { UserRequest } from '../../../user/Services/userRequest.model';

import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './volunteers-dashboard.component.html',
  styleUrls: ['./volunteers-dashboard.component.css']
})

export class VolunteersDashboardComponent implements OnInit {

  volunteerlist;
  volunteerTaskList: UserRequest[]
  totalTaskCount: number
  waitingForAcceptTaskCount: number
  ongoingTaskCount: number


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
    task.status = 'Done';
    this.volunteerlist.requestId = "";
    this.dataservice.updateVolunteer(localStorage.getItem('userId'), this.volunteerlist)
    this.dataservice.updateTaskStatus(task);
  }

  onAccept(task) {
    task.status = 'Confirmed';
    this.dataservice.updateTaskStatus(task);
  }
  onRejected(task) {
    task.status = 'Rejected';
    this.volunteerlist.requestId = "";
    this.dataservice.updateVolunteer(localStorage.getItem('userId'), this.volunteerlist)
    this.dataservice.updateTaskStatus(task);
  }
  onNotDone(task) {
    task.status = 'Not Done';
    task.volunteerId = '';
    this.dataservice.updateTaskStatus(task);
  }

  signout() {
    localStorage.clear();
    sessionStorage.clear();
    const redirectUrl = 'admin/login';
    this.router.navigate([redirectUrl]);
  }

}
