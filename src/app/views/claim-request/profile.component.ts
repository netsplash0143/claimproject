import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ApiService } from '../../api.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  user_id: any;
  role:any;
  current_user: any;
  public editModal;
  response: any;
  response_status: any = false;
  validations_form: FormGroup;
  assessorlat:any='';
  assessorlng:any='';
  addressfield:any;
  options:any;
  
  constructor(
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService:ApiService){}

  ngOnInit(){
    this.options = {
			types: [],
			componentRestrictions: { country: 'IL' }
		};
    this.validations_form = new FormGroup({
      Firstname: new FormControl('',Validators.required),
      Lastname: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      radius:new FormControl('',Validators.required),
      Business_id_number:new FormControl('',Validators.required),
      License_number:new FormControl('',Validators.required),
      card_holdername:new FormControl('',Validators.required),
      card_number:new FormControl('',Validators.required),
      card_cvv:new FormControl('',Validators.required),
      card_exp_month:new FormControl('',Validators.required),
      card_exp_year:new FormControl('',Validators.required)
    });
    
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    this.apiService.get_assessor_info(this.user_id).subscribe(
      data => {
        console.log(JSON.stringify(data));
        if(data.error == false){
          this.current_user = data.result;
          this.validations_form.patchValue(data.result);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }
  
  get f() { return this.validations_form.controls; }
  
  update_profile(){
    let Firstname = this.validations_form.value.Firstname;
    let Lastname = this.validations_form.value.Lastname;
    let License_number = this.validations_form.value.License_number;
    let Business_id_number = this.validations_form.value.Business_id_number;
    var form_data = {
      user_id : this.user_id,
      Firstname : Firstname,
      Lastname : Lastname,
      city:this.addressfield,
      License_number:License_number,
      Business_id_number:Business_id_number,
      latitude:this.assessorlat,
      longitude:this.assessorlng,
      radius:this.validations_form.value.radius,
      card_holdername:this.validations_form.value.card_holdername,
      card_number:this.validations_form.value.card_number,
      card_cvv:this.validations_form.value.card_cvv,
      card_exp_month:this.validations_form.value.card_exp_month,
      card_exp_year:this.validations_form.value.card_exp_year
    };
   // console.log(form_data);

    this.apiService.update_assessor_profile(form_data).subscribe(
      data => {
      //  console.log("Response :"+JSON.stringify(data));
        if(data.error == false){
          this.response = data.text;
          this.response_status = true;
          this.toastr.success('Response!', data.text);
        }
        else
        {
          this.toastr.warning('Response!', data.text);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }

  onAssessorAddressChange(address: any) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    this.addressfield = address.formatted_address;
    this.assessorlat = address.geometry.location.lat();
    this.assessorlng = address.geometry.location.lng();
  }

}
