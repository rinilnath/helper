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
  volunteerlist: Observable<any[]>
  volunteerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rpassword: new FormControl('', [Validators.required]),
    district: new FormControl(''),
    localbody: new FormControl('')

  })
  constructor(public authservice: AuthService,
    public dataservice: DataService,
    private router: Router) {
    this.volunteerlist = this.dataservice.getVolunteers(localStorage.getItem("District"), localStorage.getItem("LocalBody")).valueChanges()
  }

  ngOnInit(): void {
    console.log(this.volunteerlist)
  }
  onSubmit() {    
    this.volunteerForm.value.district = localStorage.getItem("District")
    this.volunteerForm.value.localbody = localStorage.getItem("LocalBody")
    if (!this.volunteerForm.invalid) {
      this.dataservice.addVolunteer(this.volunteerForm.value)
    }
    else {
      alert("invalid input")
    }
  }

}
