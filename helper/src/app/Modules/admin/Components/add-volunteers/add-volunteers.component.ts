import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.css']
})
export class AddVolunteersComponent implements OnInit {
  error = ''
  success = ''
  processing = ''

  volunteerlist:Observable<any[]>
  volunteerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rpassword: new FormControl('', [Validators.required])
  })
  constructor(public authservice: AuthService,
    public dataservice: DataService,
    private router:Router) {
      this.volunteerlist=this.dataservice.getVolunteers(localStorage.getItem("District"),localStorage.getItem("LocalBody")).valueChanges()
     }

  ngOnInit(): void {
    console.log(this.volunteerlist)
  }
  onSubmit() {
    this.error = '',
    this.success = ''
    this.processing = ''
    if (!this.volunteerForm.invalid) {
      this.processing = 'Processing request . Please wait ..'
      this.authservice.register(this.volunteerForm.value.email, this.volunteerForm.value.password)
        .then(async data => {
          const {name,ward,phone,email}=this.volunteerForm.value
          const district=localStorage.getItem("District"),
          localbody=localStorage.getItem("LocalBody")
          this.dataservice.addVolunteer(data.user.uid, {
            name,
            ward,
            phone,
            email,
            localbody,
            district
          }).then(async data => {
            console.log(data)
            this.processing = ''
            this.success = "Added new volunteer"
            this.volunteerForm.reset()
          })
            .catch(data => console.log(data))

        }).catch(data => {
          this.error = data.message
        })
    }
    else {
      this.error = "All fields are required";
      console.log(this.error)
    }
  }

}
