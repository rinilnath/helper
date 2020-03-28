import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getUser()
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
