import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'GarageProfile.component.html'
})
export class GarageProfileComponent implements OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  garageinfo: any;
  basic_form: FormGroup;
  business_form: FormGroup;
  user_id: any;
  role: any;
  response1: any = '';
  errflag1: boolean = false;
  response2: any = '';
  errflag2: boolean = false;
  isdeliveryoption: boolean = false;
  garagelat:any='';
  garagelng:any='';
  addressfield:any='';
  zoom: number = 11;
  radius:number;
  cDraggable:boolean=false;



  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    console.log(`GarageProfileComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);
    this.basic_form = new FormGroup({
      Name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      Contact_name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      email: new FormControl('', Validators.required),
      cell_phone_number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });

    this.business_form = new FormGroup({
      business_id_number: new FormControl('', Validators.required),
      License_number: new FormControl('', Validators.required),
      authorized_importer: new FormControl('', Validators.required),
      delivery_allowed: new FormControl('', Validators.required),
      delivery_radius: new FormControl('')
    });

    this.apiService.get_garage_info(this.user_id).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.garageinfo = data.result
          this.garagelat = parseFloat(data.result.latitude);
          this.garagelng = parseFloat(data.result.longitude);
          this.radius=parseFloat(data.result.delivery_radius)*1609.34; //meter

          this.basic_form.patchValue(data.result);
          this.business_form.patchValue(data.result);
          this.isdeliveryoption = data.result.delivery_allowed;
        }
        else {
          this.toastr.warning('Response!', data.text);
        }

      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }

  ondeliveryoption(event){
    
    console.log('delivery option'+!this.isdeliveryoption);
    this.isdeliveryoption=!this.isdeliveryoption;
  }

  changeRadius(event){
    console.log(event.target.value);
    this.radius=parseFloat(event.target.value)*1609.34;
  }


  basic_info_update() {

    if (this.user_id != 'undefined') {
      console.log(`user_id ${this.user_id}`);

      var forminput={
        Contact_name:this.basic_form.value.Contact_name,
        cell_phone_number:this.basic_form.value.cell_phone_number,
        email:this.basic_form.value.email,
        Name:this.basic_form.value.Name,
        city:this.basic_form.value.city,
        latitude:this.garagelat,
        longitude:this.garagelng
      };
      this.apiService.update_garage_basic(forminput, this.user_id).subscribe(
        data => {
          if (data.error==false) {
            this.toastr.success('Response!', data.text);
          }
          else {
            this.toastr.warning('Response!', data.text);
          }

        },
        error => {
          this.toastr.error('Response!', 'Something went wrong on server side!!');
        });
    }
  }

  updatebusinessinfo() {

    var forminput={
      authorized_importer:+this.business_form.value.authorized_importer,
      License_number:this.business_form.value.License_number,
      business_id_number:this.business_form.value.business_id_number,
      delivery_allowed:+this.business_form.value.delivery_allowed,
      delivery_radius:this.business_form.value.delivery_radius,
    };
    if (this.user_id != 'undefined') {
      console.log(`user_id ${this.user_id}`);
      this.apiService.update_garage_business(forminput, this.user_id).subscribe(
        data => {
   
          if (data.result) {
            this.toastr.success('Response!', data.text);
          }
          else {
            this.toastr.warning('Response!', data.text);
          }

        },
        error => {
          this.toastr.error('Response!', 'Something went wrong on server side!!');
        });
    }
  }

  onAddressChange(address: any) {
		console.log(address);
		console.log(address.geometry.location.lng());
		console.log(address.geometry.location.lat());
    this.addressfield = address.formatted_address;
		this.garagelat=address.geometry.location.lat();
		this.garagelng=address.geometry.location.lng();
	}



}
