import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success = '';
  error = ''
  processing =''
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  constructor(public authservice: AuthService, public dataservice: DataService, private router: Router) { }
  onSubmit() {
    this.error = '',
    this.success = ''
    this.processing=''
    if (!this.registrationForm.invalid){
      this.processing='Processing request . Please wait ..'
      this.authservice.register(this.registrationForm.value.email, this.registrationForm.value.password)
        .then(async data => {
          this.dataservice.addLocalBody(data.user.uid, {
            name: this.registrationForm.value.name,
            district: this.registrationForm.value.district
          }).then(async data => {
            console.log(data)
            this.processing=''
            this.success = "Seccesfuly registered . Redirecting you to dashboard"
            await this.authservice.signout()
            this.router.navigate(['admin/dash'])
          })
          .catch(data => console.log(data))

        }).catch(data => {
          this.error = data.message
        })
    }
    else {
      this.error = "All fields are required";
    }
  }
  ngOnInit(): void {
  }

}
