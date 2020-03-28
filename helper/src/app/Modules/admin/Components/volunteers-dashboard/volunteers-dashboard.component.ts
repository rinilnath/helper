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
  volunteerTaskList: Observable<any[]>

  constructor(private auth: AuthService, private router: Router, private dataservice: DataService) {

    console.log(localStorage.getItem("userId"))

    this.volunteerTaskList = this.dataservice.getVolunteerTaskList(localStorage.getItem("userId")).valueChanges();

  }



  ngOnInit(): void {
     this.auth.getUserDetails();

    console.log("volunteer data", this.volunteerTaskList)
  }

}
