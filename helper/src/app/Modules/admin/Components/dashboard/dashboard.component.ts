import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs';
import { Volunteer } from '../../Services/volunteer.model';
import { UserRequest } from 'src/app/Modules/user/Services/userRequest.model';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  requestDetails: UserRequest[];
  volunteers: Volunteer[];
  district: string;
  localbody: string;
  currentRequest: UserRequest;



  constructor(private auth: AuthService,
    private router: Router,
    private dataSevice: DataService
  ) { }

  ngOnInit(): void {
    this.auth.getUser();
    this.district = localStorage.getItem("District")
    this.localbody = localStorage.getItem("LocalBody")
    this.dataSevice.getRequest(this.district.toLowerCase(), this.localbody.toLowerCase()).snapshotChanges().
      subscribe(data => {
        this.requestDetails = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as UserRequest
          };
        })
      })

    this.dataSevice.getVolunteers(this.district, this.localbody).snapshotChanges().subscribe(data => {
      this.volunteers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Volunteer
        };
      })
    })
  }

  updateRequest(user) {
    this.currentRequest = user;
    $('#myModal').modal('show');
  }

  assignVolunteer(volunteer: Volunteer) {
    if(!this.currentRequest.volunteerId){
    this.currentRequest.volunteerId = volunteer.id;
    this.currentRequest.status = "Volunteer Assigned"
    volunteer.requestId = this.currentRequest.id;
    this.dataSevice.updateVolunteerInUser(this.currentRequest);
    this.dataSevice.updateUserInVolunteer(volunteer);
    } else {
      alert("already assigned a volunteer")
    }
  }

  removeVolunteer(volunteer: Volunteer) {
    if(this.currentRequest.volunteerId == volunteer.id) {
    this.currentRequest.volunteerId = null;
    volunteer.requestId = null;
    this.currentRequest.status = "submitted";
    this.dataSevice.updateVolunteerInUser(this.currentRequest);
    this.dataSevice.updateUserInVolunteer(volunteer);
    } else {
      alert("Wrong Request")
    }
  }

  signout() {
    this.auth.signout()
      .then(data => {
        console.log(data);
        this.router.navigate(['admin/login'])
      })
      .catch(data => console.log(data))
  }
}
