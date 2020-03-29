import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs';
import { UserRequest } from '../../../user/Services/userRequest.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './volunteers-dashboard.component.html',
  styleUrls: ['./volunteers-dashboard.component.css']
})

export class VolunteersDashboardComponent implements OnInit {

  volunteerlist: Observable<any[]>
  volunteerTaskList: UserRequest[]

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
    this.auth.getUserDetails();
  }

  onDone(task) {
    task.status = 'done';
    this.dataservice.updateTaskStatus(task);
  }

}
