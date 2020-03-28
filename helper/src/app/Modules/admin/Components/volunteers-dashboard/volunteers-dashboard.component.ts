import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './volunteers-dashboard.component.html',
  styleUrls: ['./volunteers-dashboard.component.css']
})

export class VolunteersDashboardComponent implements OnInit {

  volunteerlist: Observable<any[]>

  constructor(private auth: AuthService, private router: Router, private dataservice: DataService) {
    this.dataservice.getAllVolunteers(localStorage.getItem("District"),
      localStorage.getItem("LocalBody"))

    this.volunteerlist = this.dataservice.getAllVolunteers(localStorage.getItem("District"),
      localStorage.getItem("LocalBody")).valueChanges()
  }



  ngOnInit(): void {
    let user = this.auth.getUserDetails();

    console.log(user);

    console.log("data list", this.volunteerlist);
  }

}
