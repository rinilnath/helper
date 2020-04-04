import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as CryptoJS from 'crypto-js';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.css']
})
export class AddVolunteersComponent implements OnInit {
  volunteerlist
  volunteerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    specialisation: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    district: new FormControl(''),
    localbody: new FormControl(''),
    id: new FormControl(''),

  })

  constructor(public authservice: AuthService,
    public dataservice: DataService,
    private router: Router) {
    this.dataservice.getVolunteers(localStorage.getItem("District"), localStorage.getItem("LocalBody")).valueChanges().subscribe(
      x => this.volunteerlist = x
    )
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
      $('[data-toggle="tooltip"]').tooltip()
    });
  }
  
  onSubmit() {    
    this.volunteerForm.value.district = localStorage.getItem("District")
    this.volunteerForm.value.localbody = localStorage.getItem("LocalBody")
    this.volunteerForm.value.password = CryptoJS.AES.encrypt("password1234", "akalgorija").toString()
    this.volunteerForm.value.id = "vol-" + this.volunteerForm.value.phone

    if (!this.volunteerForm.invalid && this.volunteerForm.value.ward > 0) {
      let flag = false;
      let req;      
      this.volunteerlist.forEach(x => {
        req = x
        if (req.phone == this.volunteerForm.value.phone) {
          flag = true;
        }
      })
      if (flag == false) {
        this.dataservice.addVolunteer(this.volunteerForm.value.phone ,this.volunteerForm.value);
        $('#myModal').modal('show');
      } else {
        toastr.error("Number already exist")
      }
    }
    else {
      $(function () { toastr.error("invalid input") })
    }
  }

  delete(vol) {
    if (!vol.requestId) {
      if (confirm("Are you sure you want to delete this volunteer")) {
        this.dataservice.deleteVolunteer(vol);
      }
    } else {
      toastr.error("Unable to delete volunteers having pending requests")
    }
  }
}
