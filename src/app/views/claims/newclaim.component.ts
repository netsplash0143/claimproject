import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormBuilder, FormGroup, FormControl,FormArray } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  templateUrl: 'newclaim.component.html'
})
export class NewClaimComponent implements OnInit {
  validations_form: FormGroup;
  additional_cars: FormArray;
  user_id: any;
  isCheckedCars:boolean = false;
  isCheckedBody:boolean = false;
  response: any;
  response_status: any = false;

  constructor(public router: Router,
    public formBuilder: FormBuilder,
    private apiService:ApiService) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.validations_form = new FormGroup({
      Insurance_company_name: new FormControl('',Validators.required),
      Insurance_agent_name: new FormControl('',Validators.required),
      Insured_name: new FormControl('',Validators.required),
      Insured_id_number: new FormControl('',Validators.required),
      Insured_address: new FormControl('',Validators.required),
      Insured_cellphone: new FormControl('',Validators.required),
      car_manufacturer: new FormControl('',Validators.required),
      car_model: new FormControl('',Validators.required),
      car_year: new FormControl('',Validators.required),
      License_plate_number: new FormControl('',Validators.required),
      Driver_at_event_time: new FormControl('',Validators.required),
      Driver_name: new FormControl('',Validators.required),
      Driver_id_number: new FormControl('',Validators.required),
      Driver_gender: new FormControl('',Validators.required),
      Driver_birthdate: new FormControl('',Validators.required),
      Driver_cellphone: new FormControl('',Validators.required),
      Driver_address: new FormControl('',Validators.required),
      Driver_date_of_issuance_of_license: new FormControl('',Validators.required),
      Event_date: new FormControl('',Validators.required),
      Event_time: new FormControl('',Validators.required),
      Event_place: new FormControl('',Validators.required),
      Event_description: new FormControl('',Validators.required),
      Car_damage_description: new FormControl('',Validators.required),
      Care_damage_location: new FormControl('',Validators.required),
      Event_occured_on: new FormControl('',Validators.required),
      Event_fault: new FormControl('',Validators.required),
      Road_type: new FormControl('',Validators.required),
      Number_of_involved_car: new FormControl('',Validators.required),
      police_involved: new FormControl('',Validators.required),
      police_station_name: new FormControl('',Validators.required),
      License_suspension: new FormControl('',Validators.required),
      body_injured: new FormControl('',Validators.required),
      wind_shield: new FormControl('',Validators.required),
      wheels: new FormControl('',Validators.required),
      engine: new FormControl('',Validators.required),
      bumpers: new FormControl('',Validators.required),
      fenders: new FormControl('',Validators.required),
      doors: new FormControl('',Validators.required),
      hoods: new FormControl('',Validators.required),
      roofs: new FormControl('',Validators.required),
      trunks: new FormControl('',Validators.required),
      head_light: new FormControl('',Validators.required),
      isChecked_cars: new FormControl(''),
      other_car_name: new FormControl(''),
      other_car_license_plate_number: new FormControl(''),
      other_car_address: new FormControl(''),
      other_car_cellphone: new FormControl(''),
      other_car_insurance_company_name: new FormControl(''),
      other_car_manufacturer: new FormControl(''),
      other_car_model: new FormControl(''),
      other_car_year: new FormControl(''),
      isChecked_body: new FormControl(''),
      injured_name: new FormControl(''),
      injured_address: new FormControl(''),
      injured_phone_number: new FormControl('')
    });

    // this.validations_form = new FormGroup({
    //   Insurance_company_name: new FormControl(''),
    //   Insurance_agent_name: new FormControl(''),
    //   Insured_name: new FormControl(''),
    //   Insured_id_number: new FormControl(''),
    //   Insured_address: new FormControl(''),
    //   Insured_cellphone: new FormControl(''),
    //   car_manufacturer: new FormControl(''),
    //   car_model: new FormControl(''),
    //   car_year: new FormControl(''),
    //   License_plate_number: new FormControl(''),
    //   Driver_at_event_time: new FormControl(''),
    //   Driver_name: new FormControl(''),
    //   Driver_id_number: new FormControl(''),
    //   Driver_gender: new FormControl(''),
    //   Driver_birthdate: new FormControl(''),
    //   Driver_cellphone: new FormControl(''),
    //   Driver_address: new FormControl(''),
    //   Driver_date_of_issuance_of_license: new FormControl(''),
    //   Event_date: new FormControl(''),
    //   Event_time: new FormControl(''),
    //   Event_place: new FormControl(''),
    //   Event_description: new FormControl(''),
    //   Car_damage_description: new FormControl(''),
    //   Care_damage_location: new FormControl(''),
    //   Event_occured_on: new FormControl(''),
    //   Event_fault: new FormControl(''),
    //   Road_type: new FormControl(''),
    //   Number_of_involved_car: new FormControl(''),
    //   police_involved: new FormControl(''),
    //   police_station_name: new FormControl(''),
    //   License_suspension: new FormControl(''),
    //   body_injured: new FormControl(''),
    //   isChecked_cars: new FormControl(''),
    //   isChecked_body: new FormControl(''),
    //   injured_name: new FormControl(''),
    //   injured_address: new FormControl(''),
    //   injured_phone_number: new FormControl(''),
    //   additional_cars: this.formBuilder.array([this.createItem()])
    // });
  }

  createClaim(){
    /** Basic Info **/
    let Insurance_company_name = this.validations_form.value.Insurance_company_name;
    let Insurance_agent_name = this.validations_form.value.Insurance_agent_name;
    let Insured_name = this.validations_form.value.Insured_name;
    let Insured_id_number = this.validations_form.value.Insured_id_number;
    let Insured_address = this.validations_form.value.Insured_address;
    let Insured_cellphone = this.validations_form.value.Insured_cellphone;
    let car_manufacturer = this.validations_form.value.car_manufacturer;
    let car_model = this.validations_form.value.car_model;
    let car_year = this.validations_form.value.car_year;
    let License_plate_number = this.validations_form.value.License_plate_number;
    let Driver_at_event_time = this.validations_form.value.Driver_at_event_time;
    let Driver_name = this.validations_form.value.Driver_name;
    let Driver_id_number = this.validations_form.value.Driver_id_number;
    let Driver_gender = this.validations_form.value.Driver_gender;
    let Driver_birthdate = this.validations_form.value.Driver_birthdate;
    let Driver_cellphone = this.validations_form.value.Driver_cellphone;
    let Driver_address = this.validations_form.value.Driver_address;
    let Driver_date_of_issuance_of_license = this.validations_form.value.Driver_date_of_issuance_of_license;
    let Event_date = this.validations_form.value.Event_date;
    let Event_time = this.validations_form.value.Event_time;
    let Event_place = this.validations_form.value.Event_place;
    let Event_description = this.validations_form.value.Event_description;
    let Car_damage_description = this.validations_form.value.Car_damage_description;
    let Care_damage_location = this.validations_form.value.Care_damage_location;
    let Event_occured_on = this.validations_form.value.Event_occured_on;
    let Event_fault = this.validations_form.value.Event_fault;
    let Road_type = this.validations_form.value.Road_type;
    let Number_of_involved_car = this.validations_form.value.Number_of_involved_car;
    let police_involved = this.validations_form.value.police_involved;
    let police_station_name = this.validations_form.value.police_station_name;
    let License_suspension = this.validations_form.value.License_suspension;
    let body_injured = this.validations_form.value.body_injured;

    let basic_info = {
      user_id : this.user_id,
      Insurance_company_name : Insurance_company_name,
      Insurance_agent_name : Insurance_agent_name,
      Insured_name : Insured_name,
      Insured_id_number : Insured_id_number,
      Insured_address : Insured_address,
      Insured_cellphone : Insured_cellphone,
      car_manufacturer : car_manufacturer,
      car_model : car_model,
      car_year : car_year,
      License_plate_number : License_plate_number,
      Driver_at_event_time : Driver_at_event_time,
      Driver_name : Driver_name,
      Driver_id_number : Driver_id_number,
      Driver_gender : Driver_gender,
      Driver_birthdate : Driver_birthdate,
      Driver_cellphone : Driver_cellphone,
      Driver_address : Driver_address,
      Driver_date_of_issuance_of_license : Driver_date_of_issuance_of_license,
      Event_date : Event_date,
      Event_time : Event_time,
      Event_place : Event_place,
      Event_description : Event_description,
      Car_damage_description : Car_damage_description,
      Care_damage_location : Care_damage_location,
      Event_occured_on : Event_occured_on,
      Event_fault : Event_fault,
      Road_type : Road_type,
      Number_of_involved_car : Number_of_involved_car,
      police_involved : police_involved,
      police_station_name : police_station_name,
      License_suspension : License_suspension,
      body_injured : body_injured
    };

    /** Damaged Parts **/
    let wind_shield = this.validations_form.value.wind_shield;
    let wheels = this.validations_form.value.wheels;
    let engine = this.validations_form.value.engine;
    let bumpers = this.validations_form.value.bumpers;
    let fenders = this.validations_form.value.fenders;
    let doors = this.validations_form.value.doors;
    let hoods = this.validations_form.value.hoods;
    let roofs = this.validations_form.value.roofs;
    let trunks = this.validations_form.value.trunks;
    let head_light = this.validations_form.value.head_light;

    let damage_parts = {
      wind_shield : wind_shield,
      wheels : wheels,
      engine : engine,
      bumpers : bumpers,
      fenders : fenders,
      doors : doors,
      hoods : hoods,
      roofs : roofs,
      trunks : trunks,
      head_light : head_light
    };

    /** Third Party **/
    let other_car_name = this.validations_form.value.other_car_name;
    let other_car_license_plate_number = this.validations_form.value.other_car_license_plate_number;
    let other_car_address = this.validations_form.value.other_car_address;
    let other_car_cellphone = this.validations_form.value.other_car_cellphone;
    let other_car_insurance_company_name = this.validations_form.value.other_car_insurance_company_name;
    let other_car_manufacturer = this.validations_form.value.other_car_manufacturer;
    let other_car_model = this.validations_form.value.other_car_model;
    let other_car_year = this.validations_form.value.other_car_year;

    let thirdparties = [{
      name : other_car_name,
      license_plate_number : other_car_license_plate_number,
      address : other_car_address,
      cellphone : other_car_cellphone,
      insurance_company_name : other_car_insurance_company_name,
      car_manufacturer : other_car_manufacturer,
      car_model : other_car_model,
      car_year : other_car_year
    }];

    /** Injured Persons **/
    let injured_name = this.validations_form.value.injured_name;
    let injured_address = this.validations_form.value.injured_address;
    let injured_phone_number = this.validations_form.value.injured_phone_number;

    let Injuredpersons = [{
      name : injured_name,
      address : injured_address,
      phone_number : injured_phone_number
    }];

    /** Final Form Data **/
    let form_data = {
      basic_info : basic_info,
      damage_parts : damage_parts,
      thirdparties : thirdparties,
      Injuredpersons : Injuredpersons
    };

    console.log("Form Data :"+JSON.stringify(form_data));

    this.apiService.createClaim(form_data).subscribe(
      data => {
        console.log("Response :"+JSON.stringify(data));
        if(data.error == false){
          this.response = data.text;
          this.response_status = true;
          setTimeout(()=>{
            location.reload();
          }, 3000);
        }
      },
      error => {
        console.log("Error :"+JSON.stringify(error));
      }
    );
  }  

  selectChildren(additional_cars: any) {
    // let parentChecked = data.checked;
    // additional_cars.foreach(obj => {
    //   console.log("additional_cars obj :"+JSON.stringify(obj));
    //   obj.foreach(childObj=> {
    //     value.checked = parentChecked;
    //   })
    // });
  }

  checkValueCars(){
    this.isCheckedCars = this.validations_form.value.isChecked_cars;
    console.log("isCheckedCars :"+this.isCheckedCars);
  }

  checkValueBody(){
    this.isCheckedBody = this.validations_form.value.isChecked_body;
    console.log("isCheckedBody :"+this.isCheckedBody);
  } 

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      license_plate_number: '',
      address: '',
      cellphone:'',
      insurance_company_name:'',
      car_manufacturer:'',
      car_model:'',
      car_year:''
    });
  }

  addItem(){
    this.additional_cars = this.validations_form.get('additional_cars') as FormArray;
    this.additional_cars.push(this.createItem());
  }
  
}
