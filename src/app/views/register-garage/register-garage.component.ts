import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-dashboard',
	templateUrl: 'register-garage.component.html'
})
export class RegisterGarageComponent {
	@ViewChild('places') places: GooglePlaceDirective;
	garage_form: FormGroup;
	//companylist: any;
	addressfield: any = '';
	garageaddress: any = '';
	garagelat: any = '';
	garagelng: any = '';
	options: any;
	radiusflag:boolean=false;
	logo: any='';
	prevlogofile:any='';
	selectedfile: any = '';
	btnname: any = 'Upload';
	showmanufacturer:boolean=false;
	manfacturerlist:any=[];

	constructor(
		public formBuilder: FormBuilder,
		private apiService: ApiService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		public router: Router) { }

	ngOnInit() {
		this.options = {
			types: [],
			componentRestrictions: { country: 'IL' }
		};
		this.garage_form = new FormGroup({
			garage_name: new FormControl('', Validators.compose([
				Validators.minLength(2),
				Validators.required
			])),
			contact_name: new FormControl('', Validators.compose([
				Validators.minLength(2),
				Validators.required
			])),
			logofile: new FormControl(''),
			email: new FormControl('', Validators.required),
			mobile: new FormControl('', Validators.required),
			officenumber: new FormControl('', Validators.required),
			faxnumber: new FormControl('', Validators.required),
			business_id_number: new FormControl('', Validators.required),
			delivery_allowed: new FormControl('', Validators.required),
			delivery_radius: new FormControl(''),
			car_manufacturer_id: new FormControl(''),
		//	Seniority: new FormControl('', Validators.required),
			city: new FormControl('', Validators.required),
			password: new FormControl('', Validators.compose([
				Validators.maxLength(25),
				Validators.minLength(2),
				Validators.required
			])),
			authorized_importer: new FormControl('', Validators.required),
			License_number: new FormControl('', Validators.required),
			cardholdername: new FormControl('', Validators.required),
			cardnumber: new FormControl('', Validators.required),
			cvv: new FormControl('', Validators.required),
			card_exp_year: new FormControl('', Validators.required),
			card_exp_month: new FormControl('', Validators.required),
			payment_method: new FormControl('', Validators.required),
			bank: new FormControl('', Validators.required),
			bank_branch_number: new FormControl('', Validators.required),
			bank_account_number: new FormControl('', Validators.required)
		
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
	}

	get f() { return this.garage_form.controls; }

	onAuthorizedImporter(e){
		if(e.target.value=='1'){
			this.showmanufacturer=true;
		}
		else
		{
			this.showmanufacturer=false;
		}
	}
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
				role: 'garage'
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

	register_garage() {
		console.log('register_garage clicked');
		this.spinner.show();
		let form_data = {
			Name: this.garage_form.value.garage_name,
			contact_name: this.garage_form.value.contact_name,
			email: this.garage_form.value.email,
			cell_phone_number: this.garage_form.value.mobile,
			password: this.garage_form.value.password,
			business_id_number: this.garage_form.value.business_id_number,
			License_number: this.garage_form.value.License_number,
			image:this.logo,
			office_phone_number:this.garage_form.value.officenumber,
			fax_phone_number:this.garage_form.value.faxnumber,
			//Seniority:this.garage_form.value.Seniority,
			city: this.garageaddress,
			authorized_importer: this.garage_form.value.authorized_importer,
			manufacturer:this.garage_form.value.car_manufacturer_id,
			latitude: this.garagelat,
			longitude: this.garagelng,
			delivery_allowed:this.garage_form.value.delivery_allowed,
			delivery_radius:this.garage_form.value.delivery_radius,
			payment_method:this.garage_form.value.payment_method,
			card_holdername:this.garage_form.value.cardholdername,
			card_number:this.garage_form.value.cardnumber,
			card_cvv:this.garage_form.value.cvv,
			card_exp_month:this.garage_form.value.card_exp_month,
			card_exp_year:this.garage_form.value.card_exp_year,
			bank:this.garage_form.value.bank,
			bank_branch_number:this.garage_form.value.bank_branch_number,
			bank_account_number:this.garage_form.value.bank_account_number
		};
		console.log("Form Data :" + JSON.stringify(form_data));
		this.apiService.register_garage(form_data).subscribe(
			data => {
				this.spinner.hide();
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.toastr.success('Response!', data.text);
					this.router.navigate(['/confirm_register_garage', { user_id: data.result }]);
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

	ondeliverychange(e){
		if(e.target.value==1){
		  this.radiusflag=true;
		}
		else
		{
			this.radiusflag=false;
		}
	}

	onGarageAddressChange(address: any) {
		console.log(address);
		console.log(address.geometry.location.lng());
		console.log(address.geometry.location.lat());
		this.garageaddress = address.formatted_address;
		this.garagelat = address.geometry.location.lat();
		this.garagelng = address.geometry.location.lng();
	}
}
