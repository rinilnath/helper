import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService,public router:Router) { }

  ngOnInit(): void {
  }
  signout() {
    localStorage.clear();
    sessionStorage.clear();
    this.auth.signout()
      .then(data => {
        //console.log(data);
        this.router.navigate(['admin/login'])
      })
      .catch(data => console.log(data))
  }
}
