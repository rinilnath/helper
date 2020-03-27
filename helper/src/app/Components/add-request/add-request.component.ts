import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  addRequestForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      requirement:new FormControl('',[Validators.required]),
      desc:new FormControl(''),
      address:new FormControl('',[Validators.required]),
      // district:new FormControl('',[Validators.required]),
      // panchayat:new FormControl('',[Validators.required]),
      // ward :new FormControl('',[Validators.required]),
      // phone:new FormControl('',[Validators.required]),
  });
  constructor(private dataService:DataService) {

  }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.addRequestForm.value)
    this.dataService.addData(this.addRequestForm.value).then(data=>console.log(data)).catch(data=>console.log(data))
  }
}
