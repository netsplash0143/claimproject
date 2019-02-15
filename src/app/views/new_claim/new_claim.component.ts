import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as $ from 'jquery';

@Component({
	selector: 'new-claim',
	templateUrl: 'new_claim.component.html'
})
export class NewOuterClaimComponent {

	modalRef: BsModalRef;
	submitted = false;
	additional_cars: FormArray;
	user_id: any;
	isCheckedCars: boolean = false;
	isCheckedBody: boolean = false;
	companylist: any=[];
	agentlist:any=[];
	manfacturerlist: any;
	modellist: any;
	showagent:boolean=false;
	isLogin: boolean = false;
	IsPolceInvolved: number = 0;
	settings = {
		bigBanner: false,
		timePicker: false,
		format: 'dd/MM/yyyy',
		defaultOpen: false,
		closeOnSelect: true,
		rangepicker: false
	};
	years = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
	isLinear = true;
	validations_form: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	fourthFormGroup: FormGroup;
	isOptionalThird: boolean = false;
	isOptionalSecond: boolean = false;
	isOptionaldamage: boolean = false;
	nocardamageflag: boolean = false;
	partFormArray: Array<any> = [];
	parts: Array<any> = [];
	claim_unique_id: any;
	// parts = [
	// 	{ id: "front", class: 'front', label: 'Front' },
	// 	{ id: "rightFront", class: 'rightFront', label: 'Right Front' },
	// 	{ id: "leftFront", class: 'leftFront', label: 'Left Front' },
	// 	{ id: "left", class: 'left', label: 'Left' },
	// 	{ id: "right", class: 'right', label: 'Right' },
	// 	{ id: "backLeft", class: 'backLeft', label: 'Back Left' },
	// 	{ id: "backRight", class: 'backRight', label: 'Back Right' },
	// 	{ id: "back", class: 'back', label: 'Back' },
	// 	{ id: "roof", class: 'roof', label: 'Roof' },
	// 	{ id: "bottom", class: 'bottom', label: 'Bottom' },
	// ];

	constructor(public router: Router,
		public formBuilder: FormBuilder,
		private apiService: ApiService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private modalService: BsModalService) { }

	ngOnInit() {
		/** Session Check **/
		let user_id = localStorage.getItem('user_id');
		console.log("user_id :" + user_id);
		if (user_id != null) {
			console.log("Logged In !");
			this.isLogin = true;
		}

		this.validations_form = this.formBuilder.group({
			Ins_coy_id: new FormControl('', Validators.required),
			Insurance_agent_name: new FormControl('', Validators.required),
			Insured_name: new FormControl('', Validators.required),
			Insured_id_number: new FormControl('', Validators.required),
			Insured_address: new FormControl('', Validators.required),
			Insured_cellphone: new FormControl('',  Validators.required),
			car_manufacturer_id: new FormControl('', Validators.required),
			car_model_id: new FormControl('', Validators.required),
			car_year: new FormControl('', Validators.required),
			License_plate_number: new FormControl('', Validators.compose([
				Validators.maxLength(7),
				Validators.required
			])),
			Driver_at_event_time: new FormControl('', Validators.required),
			Driver_name: new FormControl('', Validators.required),
			Driver_id_number: new FormControl('',  Validators.compose([
				Validators.maxLength(9),
				Validators.required
			])),
			Driver_gender: new FormControl('', Validators.required),
			Driver_birthdate: new FormControl(new Date(), Validators.required),
			Driver_cellphone: new FormControl('',  Validators.required),
			Driver_address: new FormControl('', Validators.required),
			Driver_date_of_issuance_of_license: new FormControl(new Date(), Validators.required),
			Event_date: new FormControl(new Date(), Validators.required),
			Event_time: new FormControl('', Validators.required),
			Event_place: new FormControl('', Validators.required),
			Event_description: new FormControl('', Validators.required),
			Car_damage_description: new FormControl('', Validators.required),
			Event_occured_on: new FormControl('', Validators.required),
			Event_fault: new FormControl('', Validators.required),
			Road_type: new FormControl('', Validators.required),
			Number_of_involved_car: new FormControl('', Validators.required),
			police_involved: new FormControl('', Validators.required),
			police_station_name: new FormControl(''),
			License_suspension: new FormControl('', Validators.required),
			body_injured: new FormControl('', Validators.required),
		});

		this.secondFormGroup = this.formBuilder.group({
			other_car_name: new FormControl('', Validators.required),
			other_car_license_plate_number: new FormControl('', Validators.required),
			other_car_address: new FormControl('', Validators.required),
			other_car_cellphone: new FormControl('', Validators.required),
			other_car_insurance_company_name: new FormControl('', Validators.required),
			other_car_manufacturer: new FormControl('', Validators.required),
			other_car_model: new FormControl('', Validators.required),
			other_car_year: new FormControl('', Validators.required)
		});

		this.thirdFormGroup = this.formBuilder.group({
			injured_name: new FormControl('', Validators.required),
			injured_address: new FormControl('', Validators.required),
			injured_phone_number: new FormControl('', Validators.required)
		});

		this.apiService.get_insurance_company_list().subscribe(
			data => {

				if (data.error == false) {
					this.companylist = data.result;
					console.log(data.result);
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});
		this.apiService.get_manufacturer_list().subscribe(
			data => {
				if (data.error == false) {
					this.manfacturerlist = data.result;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});

		this.apiService.list_vehicle_parts().subscribe(
			data => {

				if (data.error == false) {
					this.parts = data.result;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});

	}

	get f() { return this.validations_form.controls; }
	get f2() { return this.secondFormGroup.controls; }

	Oncardamageflag(e) {
		console.log(e.target.checked);
		this.nocardamageflag = e.target.checked;
	}

	OnchangeInsurancecoy(event){
		console.log(event.target.value);
		let company = this.companylist.find(x => x.id === parseInt(event.target.value));
		if(company!=undefined){
			//get agent using api
			this.apiService.get_agent_list(event.target.value).subscribe(
				data => {
	
					if (data.error == false) {
						this.agentlist = data.result;
						console.log(data.result);
						this.showagent=true;
					}
				},
				error => {
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		
		}
		else
		{
			this.showagent=false;
		}
	}
	onChangepart(id: string, isChecked: boolean) {
		if (isChecked) {
			this.partFormArray.push(id);
		} else {
			let index = this.partFormArray.indexOf(id);
			this.partFormArray.splice(index, 1);
		}
		$('#front').change(function(){
			if ($(this).is(':checked')) {
				$(".st12").css("fill", "red");
				$(".st12").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
			}
			else {
				$(".st12").css("fill", "#9599a1");
				$(".st12").css("opacity", "0.6");
				$(this).parent().parent().removeClass("borderClass");
	
			}
		});
		
		$('#rightFront').change(function(){
			if ($(this).is(':checked')) {
				$(".st13").css("opacity", "0.7");
				$(".st13").css("fill", "red");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st13").css("opacity", "0.7");
				$(".st13").css("fill", "#9599a1");
				$(this).parent().parent().removeClass("borderClass");
			}
		});
		
		$('#leftFront').change(function(){
			if ($(this).is(':checked')) {
				$(".st14").css("fill", "red");
				$(".st14").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st14").css("fill", "#9599a1");
				$(".st14").css("opacity", "0.7");
				$(this).parent().parent().removeClass("borderClass");
			}
		});
		
		$('#left').change(function(){
	
			if ($(this).is(':checked')) {
				$(".st15").css("fill", "red");
				$(".st19").css("fill", "red");
				$(".st21").css("fill", "red");
				$(".st15").css("opacity", "0.7");
				$(".st19").css("opacity", "0.7");
				$(".st21").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st15").css("fill", "#9599a1");
				$(".st19").css("fill", "#9599a1");
				$(".st21").css("fill", "#9599a1");
				$(".st15").css("opacity", "0.6");
				$(".st19").css("opacity", "0.6");
				$(".st21").css("opacity", "0.6");
				$(this).parent().parent().removeClass("borderClass");
			}
			
		});
		
		$('#right').change(function(){
			if ($(this).is(':checked')) {
				$(".st16").css("fill", "red");
				$(".st20").css("fill", "red");
				$(".st22").css("fill", "red");
				$(".st16").css("opacity", "0.7");
				$(".st20").css("opacity", "0.7");
				$(".st22").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st16").css("fill", "#9599a1");
				$(".st20").css("fill", "#9599a1");
				$(".st22").css("fill", "#9599a1");
				$(".st16").css("opacity", "0.6");
				$(".st20").css("opacity", "0.6");
				$(".st22").css("opacity", "0.6");
	
				$(this).parent().parent().removeClass("borderClass");
			}
		});
		
		$('#backLeft').change(function(){
			if ($(this).is(':checked')) {
				$(".st18").css("fill", "red");
				$(".st18").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st18").css("fill", "#9599a1");
				$(".st18").css("opacity", "0.1");
				$(this).parent().parent().removeClass("borderClass");
			}
		});
	
		$('#backRight').change(function(){
			if ($(this).is(':checked')) {
				$(".st17").css("fill", "red");
				$(".st17").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st17").css("fill", "#9599a1");
				$(".st17").css("opacity", "0.1");
				$(this).parent().parent().removeClass("borderClass");
			}
		});
	
		$('#back').change(function(){
			if ($(this).is(':checked')) {
				$(".st8").css("fill", "#c83035");
				$(".st8").css("opacity", "0.7");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st8").css("fill", "#9599a1");
				$(".st8").css("opacity", "0.7");
				$(this).parent().parent().removeClass("borderClass");
			}
		});
		$('#roof').change(function(){
			if ($(this).is(':checked')) {
				$(".st23").css("opacity", "1");
				$(".st23").css("fill", "#c83035");
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(".st23").css("fill", "#9599a1");
				$(".st23").css("opacity", "0.7");
				$(this).parent().parent().removeClass("borderClass");
			}
		});
		$('#bottom').change(function(){
			if ($(this).is(':checked')) {
				$(this).parent().parent().addClass("borderClass");
	
			}
			else {
				$(this).parent().parent().removeClass("borderClass");
			}
		});
	
	}

	OnChangeManfacturer(e) {
		if (e.target.value != '') {
			this.apiService.get_model_list(e.target.value).subscribe(
				data => {

					if (data.error == false) {
						this.modellist = data.result;
					}
				},
				error => {
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
		else {
			this.modellist = [];
		}
	}


	nextstep(stepper: MatStepper) {

		if (this.validations_form.invalid == false) {
			if (this.validations_form.value.Number_of_involved_car > 1) {
				stepper.selectedIndex = 1;
			}
			else if (this.validations_form.value.body_injured == 1) {
				setTimeout(() => {           // or do some API calls/ Async events
					stepper.selectedIndex = 2;
				}, 1);

			}
			else {
				setTimeout(() => {           // or do some API calls/ Async events
					stepper.selectedIndex = 3;
				}, 1);

			}
		}
		else {

			this.toastr.warning('Response!', 'Please provide Basic information completely.');
		}
	}

	nextstep_thirdparty(stepper: MatStepper) {

		if (this.isOptionalSecond == false) {
			if (this.secondFormGroup.invalid == false) {

				if (this.validations_form.value.body_injured == 1) {
					setTimeout(() => {           // or do some API calls/ Async events
						stepper.selectedIndex = 2;
					}, 1);

				}
				else {
					setTimeout(() => {           // or do some API calls/ Async events
						stepper.selectedIndex = 3;
					}, 1);
				}
			}
			else {

				this.toastr.warning('Response!', 'Please provide Thirdparty details.');
			}
		}
		else {
			setTimeout(() => {           // or do some API calls/ Async events
				stepper.selectedIndex = 3;
			}, 1);
		}
	}


	nextstep_injuredperson(stepper: MatStepper) {

		if (this.isOptionalThird == false) {
			if (this.thirdFormGroup.invalid == false) {
				setTimeout(() => {           // or do some API calls/ Async events
					stepper.selectedIndex = 3;
				}, 1);

			}
			else {

				this.toastr.warning('Response!', 'Please provide Injuries details.');
			}
		}
		else {
			setTimeout(() => {           // or do some API calls/ Async events
				stepper.selectedIndex = 3;
			}, 1);
		}
	}

	changeevent(e) {
		console.log(e.target.value);
		if (e.target.value == 2) {
			this.isOptionalSecond = false;
		}
		else {
			this.isOptionalSecond = true;
		}
	}


	changeevent2(e) {
		console.log(e.target.value);
		if (e.target.value == 1) {
			this.isOptionalThird = false;
		}
		else {
			this.isOptionalThird = true;
		}
	}

	createclaim(stepper: MatStepper, template: TemplateRef<any>) {
		this.submitted = true;
		if (this.validations_form.invalid == true) {

			this.toastr.warning('Response!', 'Please provide required field information');
			this.submitted = false;
			return;

		} else if ((this.validations_form.value.Number_of_involved_car > 1) && (this.secondFormGroup.invalid == true)) {

			this.toastr.warning('Response!', 'Please provide Third party details');
			this.submitted = false;
		}
		else if ((this.validations_form.value.body_injured == 1) && (this.thirdFormGroup.invalid == true)) {

			this.toastr.warning('Response!', 'Please provide details of Injured person');
			this.submitted = false;
		} else if (this.nocardamageflag == false && this.partFormArray.length == 0) {
			this.toastr.warning('Response!', 'Please provide vehicle damage part details.');
			this.submitted = false;

		} else {
			this.spinner.show();
			/** Basic Info **/
			let Ins_coy_id = this.validations_form.value.Ins_coy_id;
			let Insurance_agent_name = this.validations_form.value.Insurance_agent_name;
			let Insured_name = this.validations_form.value.Insured_name;
			let Insured_id_number = this.validations_form.value.Insured_id_number;
			let Insured_address = this.validations_form.value.Insured_address;
			let Insured_cellphone = this.validations_form.value.Insured_cellphone;
			let car_manufacturer_id = this.validations_form.value.car_manufacturer_id;
			let car_model_id = this.validations_form.value.car_model_id;
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
			let Event_occured_on = this.validations_form.value.Event_occured_on;
			let Event_fault = this.validations_form.value.Event_fault;
			let Road_type = this.validations_form.value.Road_type;
			let Number_of_involved_car = this.validations_form.value.Number_of_involved_car;
			let police_involved = this.validations_form.value.police_involved;
			let police_station_name = this.validations_form.value.police_station_name;
			let License_suspension = this.validations_form.value.License_suspension;
			let body_injured = this.validations_form.value.body_injured;

			let basic_info = {
				Ins_coy_id: Ins_coy_id,
				Insurance_agent_name: Insurance_agent_name,
				Insured_name: Insured_name,
				Insured_id_number: Insured_id_number,
				Insured_address: Insured_address,
				Insured_cellphone: Insured_cellphone,
				car_manufacturer_id: car_manufacturer_id,
				car_model_id: car_model_id,
				car_year: car_year,
				License_plate_number: License_plate_number,
				Driver_at_event_time: Driver_at_event_time,
				Driver_name: Driver_name,
				Driver_id_number: Driver_id_number,
				Driver_gender: Driver_gender,
				Driver_birthdate: this.getcorrectdate(Driver_birthdate),
				Driver_cellphone: Driver_cellphone,
				Driver_address: Driver_address,
				Driver_date_of_issuance_of_license: this.getcorrectdate(Driver_date_of_issuance_of_license),
				Event_date: this.getcorrectdate(Event_date),
				Event_time: Event_time + ':00',
				Event_place: Event_place,
				Event_description: Event_description,
				Car_damage_description: Car_damage_description,
				Event_occured_on: Event_occured_on,
				Event_fault: Event_fault,
				Road_type: Road_type,
				Number_of_involved_car: Number_of_involved_car,
				police_involved: police_involved,
				police_station_name: police_station_name,
				License_suspension: License_suspension,
				body_injured: body_injured,
				no_car_damage: this.nocardamageflag
			};
			/** Third Party **/
			let thirdparties = [{
				name: this.secondFormGroup.value.other_car_name,
				license_plate_number: this.secondFormGroup.value.other_car_license_plate_number,
				address: this.secondFormGroup.value.other_car_address,
				cellphone: this.secondFormGroup.value.other_car_cellphone,
				insurance_company_name: this.secondFormGroup.value.other_car_insurance_company_name,
				car_manufacturer: this.secondFormGroup.value.other_car_manufacturer,
				car_model: this.secondFormGroup.value.other_car_model,
				car_year: this.secondFormGroup.value.other_car_year
			}];

			/** Injured Persons **/

			let Injuredpersons = [{
				name: this.thirdFormGroup.value.injured_name,
				address: this.thirdFormGroup.value.injured_address,
				phone_number: this.thirdFormGroup.value.injured_phone_number
			}];
			/** Final Form Data **/
			let form_data = {
				basic_info: basic_info,
				thirdparties: thirdparties,
				Injuredpersons: Injuredpersons,
				car_damage_parts: this.partFormArray
			};
			console.log("Complete Form Data :" + JSON.stringify(form_data));
			this.apiService.createClaim(form_data).subscribe(
				data => {
					this.spinner.hide();
					console.log("Response :" + JSON.stringify(data));
					if (data.error == false) {
						this.claim_unique_id = data.result.claim_unique_id;
						this.toastr.success('Response!', data.text);
						this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
						setTimeout(() => {
							this.validations_form.reset();
							this.secondFormGroup.reset();
							this.thirdFormGroup.reset();
							this.isOptionalSecond = false;
							this.isOptionalThird = false;
							this.submitted = false;
							stepper.selectedIndex = 0;
						}, 2000);
					}
					else {
						this.toastr.warning('Response!', data.text);
					}
				},
				error => {
					this.spinner.hide();
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
	}

	checkValueCars() {
		this.isCheckedCars = this.validations_form.value.isChecked_cars;
		console.log("isCheckedCars :" + this.isCheckedCars);
	}

	checkValueBody() {
		this.isCheckedBody = this.validations_form.value.isChecked_body;
		console.log("isCheckedBody :" + this.isCheckedBody);
	}

	getcorrectdate(str) {
		var date = new Date(str),
			mnth = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2);
		return [day, mnth, date.getFullYear()].join("/");
	}

	OnchangePoliceInvolved(e) {
		this.IsPolceInvolved = e.target.value;
	}

	// openModal(template: TemplateRef<any>) {
	// 	this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
	// }

	confirm(): void {
		this.modalRef.hide();
		this.router.navigate(['get_claim', this.claim_unique_id]);
	}

	decline(): void {
		this.modalRef.hide();
		this.router.navigate(['home']);
	}



}
