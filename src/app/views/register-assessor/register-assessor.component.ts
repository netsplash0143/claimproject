import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-dashboard',
	templateUrl: 'register-assessor.component.html'
})
export class RegisterAssessorComponent {
	@ViewChild('places') places: GooglePlaceDirective;
	validations_form: FormGroup;
	//companylist: any;
	addressfield: any = '';
	assessorlat: any = '';
	assessorlng: any = '';
	options: any;
	logo: any='';
	prevlogofile:any='';
	selectedfile: any = '';
	btnname: any = 'Upload';

	constructor(
		public formBuilder: FormBuilder,
		private apiService: ApiService,
		private toastr: ToastrService,
		public router: Router,
		private spinner: NgxSpinnerService
		) { }

	ngOnInit() {
		this.options = {
			types: [],
			componentRestrictions: { country: 'IL' }
		};
		this.validations_form = new FormGroup({
			first_name: new FormControl('', Validators.compose([
				Validators.maxLength(30),
				Validators.minLength(2),
				Validators.required
			])),
			last_name: new FormControl('', Validators.compose([
				Validators.maxLength(30),
				Validators.minLength(2),
				Validators.required
			])),
			logofile: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			mobile: new FormControl('', Validators.required),
			officenumber: new FormControl('', Validators.required),
			faxnumber: new FormControl('', Validators.required),
			License_number: new FormControl('', Validators.required),
			business_id_number: new FormControl('', Validators.required),
			Seniority: new FormControl('', Validators.required),
			city: new FormControl('', Validators.required),
			password: new FormControl('', Validators.compose([
				Validators.maxLength(25),
				Validators.minLength(4),
				Validators.required
			])),
			cardholdername: new FormControl('', Validators.required),
			cardnumber: new FormControl('', Validators.required),
			cvv: new FormControl('', Validators.required),
			card_exp_year: new FormControl('', Validators.required),
			card_exp_month: new FormControl('', Validators.required),
			payment_method: new FormControl('', Validators.required)
		});

	/*	this.apiService.get_insurance_company_list().subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.companylist = data.result;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});
		*/
	}

	// convenience getter for easy access to form fields
	get f() { return this.validations_form.controls; }

	onFileselected(e) {
		console.log(e.target.files[0]);
		this.selectedfile = <File>e.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]); // read file as data url
		reader.onload = (event: any) => { // called once readAsDataURL is completed
			//this.logo = event.target.result;
			//this.btnname = e.target.files[0].name;
			let form_data = {
				prevlogofile:this.prevlogofile,
				role: 'assessor'
			  };
			  this.apiService.get_image_url(this.selectedfile, form_data).subscribe(
				data => {
					console.log(JSON.stringify(data));
				  if (data.result) {
					//this.btnname = data.result.image_name;
					this.logo=data.result.image_url;
					this.prevlogofile=data.result.image_name;
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

	register() {
		console.log('register clicked');
		let form_data = {
			Firstname: this.validations_form.value.first_name,
			Lastname: this.validations_form.value.last_name,
			email: this.validations_form.value.email,
			cell_phone_number: this.validations_form.value.mobile,
			image:this.logo,
			office_phone_number:this.validations_form.value.officenumber,
			fax_phone_number:this.validations_form.value.faxnumber,
			Seniority:this.validations_form.value.Seniority,
			License_number:this.validations_form.value.License_number,
			Business_id_number:this.validations_form.value.business_id_number,
			password: this.validations_form.value.password,
			city: this.addressfield,
			latitude: this.assessorlat,
			longitude: this.assessorlng,
			payment_method:this.validations_form.value.payment_method,
			card_holdername:this.validations_form.value.cardholdername,
			card_number:this.validations_form.value.cardnumber,
			card_cvv:this.validations_form.value.cvv,
			card_exp_month:this.validations_form.value.card_exp_month,
			card_exp_year:this.validations_form.value.card_exp_year,
		};
		console.log("Form Data :" + JSON.stringify(form_data));
		this.spinner.show();
		this.apiService.register_assessor(form_data).subscribe(
			data => {
				this.spinner.hide();
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.toastr.success('Response!', data.text);
					this.router.navigate(['/confirm_register', { user_id: data.result }]);
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

	login() {
		this.router.navigate(['/login']);
	}

	goback() {
		this.router.navigate(['/']);
	}
	onAssessorAddressChange(address: any) {
		//console.log(address);
		console.log(address.geometry.location.lng());
		console.log(address.geometry.location.lat());
		this.addressfield = address.formatted_address;
		this.assessorlat = address.geometry.location.lat();
		this.assessorlng = address.geometry.location.lng();
	}

}
