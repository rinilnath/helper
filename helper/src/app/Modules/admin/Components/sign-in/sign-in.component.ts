import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  success = '';
  error = ''
  processing = ''
  signinForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  constructor(public authservice: AuthService, public dataservice: DataService, private router: Router) { }
  ngOnInit(): void {
  }
  onSubmit() {
    this.error = '',
      this.success = ''
    if (!this.signinForm.invalid) {
      this.processing = 'Logging you in ..'
      this.authservice.signin(this.signinForm.value.email, this.signinForm.value.password)
        .then(data => {
          this.success = 'Logged in . Redirecting you to homepage '
          this.processing = ''
          this.dataservice.getUserData(data.user.uid).subscribe(doc => {
            localStorage.setItem("District", doc.get("district"))
            localStorage.setItem("LocalBody", doc.get("name"))
            this.router.navigate(['admin/dash'])
          })
        })
        .catch(data => {
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

  volunteerLogin() {
    let flag = true;
    let req;
    let auth = this.authservice;
    let rou = this.router;
    this.dataservice.getVolunteerForLogin(this.signinForm.value.email, this.signinForm.value.password).valueChanges().
      subscribe(res => {
        req = res;
        req.forEach(function (values) {
          localStorage.setItem("userId", "vol-" + values.phone)
          flag = false;
          auth.login()
        });
        if (flag) {
          $('.modal-body').html("<p>User not exist with this details</p><p>Please check with Local-Body</p><p><i>Volunteers please login with mobile number</i></p>");
          $('#myModal').modal('show');
        }
      });
    if (auth.volunteerisLoggedIn) {
      const redirectUrl = 'admin/volunteer';
      rou.navigate([redirectUrl]);
    }
  }
}
