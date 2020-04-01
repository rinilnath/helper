import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from '../../../user/Services/userRequest.model';
import { AuthService } from '../../Services/auth.service';
import { DataService } from '../../Services/data.service';
declare var $: any;

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
  resetForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  success = '';
  error = ''
  processing = '';


  constructor(private auth: AuthService, private router: Router, private dataservice: DataService) {

    this.dataservice.getVolunteerTaskList(localStorage.getItem("userId")).subscribe(data => {
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
    this.auth.logout();
    const redirectUrl = 'admin/login';
    this.router.navigate([redirectUrl]);
  }

  onSubmit() {
    this.error = '',
      this.success = ''
    if (!this.resetForm.invalid) {
      this.processing = 'Resetting ..';
      this.dataservice.restPassword(localStorage.getItem("userId"), this.resetForm.value.password).then(data => {
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
