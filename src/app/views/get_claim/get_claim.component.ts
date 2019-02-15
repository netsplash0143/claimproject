import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RatingChangeEvent } from 'angular-star-rating';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	templateUrl: 'get_claim.component.html'
})
export class GetClaimComponent {
	@ViewChild('places') places: GooglePlaceDirective;
	@ViewChild(ModalDirective) firstmodal: ModalDirective;
	assessormodalRef: BsModalRef;
	srtamodalRef: BsModalRef;
	assessorratingRef:BsModalRef;
	garageratingRef:BsModalRef;
	public claimModal;
	assessor_name: any = '';
	garage_name: any = '';
	rating: number;
	claim_form: FormGroup;
	accessor_form: FormGroup;
	garage_form: FormGroup;
	assessorratingform: FormGroup;
	garageratingform: FormGroup;
	ratingresponse: any = '';
	ratingFlag: boolean = false;
	garage_ratingresponse: any = '';
	garage_ratingFlag: boolean = false;
	response: any = '';
	response_status: boolean = false;
	btn_status: boolean = true;
	currentlat: any = '';
	currentlng: any = '';
	claimdata: any;
	assessorList:Array<any> = [];
	requestresponse: any = '';
	request_status: boolean = false;
	claimresponse: any = '';
	claimresponse_status: boolean = false;
	footerclass: any;
	scheduledatetime: Date = new Date();
	garageOffers_status: boolean = false;
	garageOffers_response: any = '';
	garageOffers: Array<any> = [];
	confirmation_status: boolean = false;
	confirmation_msg: any = '';
	flag: boolean = false;
	sdt: any;
	isLogin: boolean = false;
	settings = {
		bigBanner: true,
		timePicker: true,
		format: 'yyyy-MM-dd HH:mm:ss',
		defaultOpen: false,
		closeOnSelect: true,
		rangepicker: false
	};
	claim_unique_id: any;
	sub: any;
	options: any;
	schedulenow: boolean = false; //later

	constructor(public router: Router,
		private route: ActivatedRoute,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private modalService: BsModalService,
		private apiService: ApiService) { }

	ngOnInit() {
		/** Session Check **/
		let user_id = localStorage.getItem('user_id');
		if (user_id != null) {
			console.log("Logged In !");
			this.isLogin = true;
		}

		this.options = {
			types: [],
			componentRestrictions: { country: 'IL' }
		};
		this.claim_form = new FormGroup({
			claim_unique_id: new FormControl('', Validators.required)
		});

		this.accessor_form = new FormGroup({
			address: new FormControl('', Validators.required),
			scheduledatetime: new FormControl(new Date())
		});

		this.garage_form = new FormGroup({
			address: new FormControl('', Validators.required)
		});
		this.assessorratingform = new FormGroup({
			message: new FormControl('', Validators.required)
		});
		this.garageratingform = new FormGroup({
			message: new FormControl('', Validators.required)
		});
		this.footerclass = "modal-footer";
		this.sdt = this.getcorrectdatetime(this.scheduledatetime);
		this.sub = this.route.params.subscribe(params => {
			if (params['claim_unique_id']) {
				this.claim_unique_id = +params['claim_unique_id'];
				this.claim_form.patchValue({ claim_unique_id: this.claim_unique_id });
				console.log("Params claim_unique_id :" + this.claim_unique_id);
				this.get_claim_info();
			}
		});
	}

	onDateSelect(e) {
		this.sdt = this.getcorrectdatetime(e);
	}

	openfirstModal() {
		this.firstmodal.show();
	}

	open_assessor_rating_box(template){
		this.assessorratingRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));
	}

	open_garage_rating(template){
		this.garageratingRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));
	}

	get_claim_info() {
		this.refresh_modal();
		this.spinner.show();
		this.claimresponse = '';
		this.garageOffers_response = '';

		var claim_unique_id = this.claim_form.value.claim_unique_id;
		if (claim_unique_id != '') {
			this.apiService.get_claim_info(claim_unique_id).subscribe(
				data => {
					this.spinner.hide();
					if (data.error == false) {
						this.claimdata = data.result;
						console.log(data.result);
						if (this.claimdata.status == 'pending') {
							this.spinner.show();
							console.log('status is:' + this.claimdata.status);
							setTimeout(() => {
								this.spinner.hide();
								this.firstmodal.show();
								if (navigator.geolocation) {
									navigator.geolocation.getCurrentPosition((position) => {
										this.btn_status = true;
										console.log("Current Position Lat & Long :" + position.coords.latitude + "  &  " + position.coords.longitude);
										this.currentlat = position.coords.latitude;
										this.currentlng = position.coords.longitude;

										this.apiService.get_address_latlong(position.coords.latitude, position.coords.longitude).subscribe((res) => {
											//console.log(res);
											console.log(res.results[0].formatted_address);
											this.accessor_form.patchValue({ address: res.results[0].formatted_address });
											this.garage_form.patchValue({ address: res.results[0].formatted_address });
										}, error => {
											console.log('error' + error);
										});
									});
								} else {
									this.response = "Geolocation is not supported by this browser.";
									this.response_status = true;
									this.btn_status = false;
									this.footerclass = "modal-footer";
								}
							}, 500);
						} else if (this.claimdata.status == 'job-completed') {
							this.garage_name = this.claimdata.garage_details.Name
						} else if (this.claimdata.status == 'approved' || this.claimdata.status == 'assessor-rated') {
							this.assessor_name = this.claimdata.assessor.Name;
						} else if (this.claimdata.status == 'offer-processing') {
							this.apiService.get_garage_offer_list(claim_unique_id).subscribe(
								data => {
									console.log("get_garage_offer_list Response :" + JSON.stringify(data));
									if (data.error == false) {
										this.garageOffers = data.result;
									}
									else {
										this.garageOffers_status = true;
										this.garageOffers_response = data.text;
									}
								},
								error => {
									console.log("Error :" + JSON.stringify(error));
									this.garageOffers_status = true;
									this.garageOffers_response = error;
								});
						}
					}
					else {
						this.claimresponse_status = true;
						this.claimresponse = data.text;
					}
				},
				error => {
					this.spinner.hide();
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
	}

	get_claim() {
		this.refresh_modal();
		this.spinner.show();
		this.claimresponse = '';
		this.garageOffers_response = '';

		var claim_unique_id = this.claim_form.value.claim_unique_id;
		if (claim_unique_id != '') {
			this.apiService.get_claim_info(claim_unique_id).subscribe(
				data => {
					this.spinner.hide();
					if (data.error == false) {
						this.claimdata = data.result;
						if (navigator.geolocation) {
							navigator.geolocation.getCurrentPosition((position) => {
								this.btn_status = true;
								console.log("Current Position Lat & Long :" + position.coords.latitude + "  &  " + position.coords.longitude);
								this.currentlat = position.coords.latitude;
								this.currentlng = position.coords.longitude;

								this.apiService.get_address_latlong(position.coords.latitude, position.coords.longitude).subscribe((res) => {
									console.log(res.results[0].formatted_address);
									this.accessor_form.patchValue({ address: res.results[0].formatted_address });
									this.garage_form.patchValue({ address: res.results[0].formatted_address });
								}, error => {
									console.log('error' + error);
								});
							});
						} else {
							this.response = "Geolocation is not supported by this browser.";
							this.response_status = true;
							this.btn_status = false;
							this.footerclass = "modal-footer";
						}
						if (this.claimdata.status == 'job-completed') {
							this.garage_name = this.claimdata.garage_details.Name
						} else if (this.claimdata.status == 'approved' || this.claimdata.status == 'assessor-rated') {
							this.assessor_name = this.claimdata.assessor.Name;
						} else if (this.claimdata.status == 'offer-processing') {
							this.apiService.get_garage_offer_list(claim_unique_id).subscribe(
								data => {
									console.log("get_garage_offer_list Response :" + JSON.stringify(data));
									if (data.error == false) {
										this.garageOffers = data.result;
									}
									else {
										this.garageOffers_status = true;
										this.garageOffers_response = data.text;
									}
								},
								error => {
									console.log("Error :" + JSON.stringify(error));
									this.garageOffers_status = true;
									this.garageOffers_response = error;
								});
						}
					}
					else {
						this.claimresponse_status = true;
						this.claimresponse = data.text;
					}
				},
				error => {
					this.spinner.hide();
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
	}

	get_assessor() {
		this.refresh_modal();
		if ((this.currentlat!='') && (this.currentlng!='')) {
			this.spinner.show();
			let form_data = {
				currentlat: this.currentlat,
				currentlng: this.currentlng,
				schedulenow:this.schedulenow
			};
			this.apiService.get_nearer_assessor(form_data).subscribe(
				data => {
					this.spinner.hide();
					console.log(JSON.stringify(data.result));
					if (data.error == false) {
						this.assessorList = data.result;
					}
					else {
						this.response_status = true;
						this.response = "No assessor available nearer to your location!!";
					}
				},
				error => {
					this.spinner.hide();
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
		else {
			console.log('latitude and longitude not found');
			this.response = 'Latitude and Longitude not found';
		}
	}

	refresh_modal() {
		this.assessorList =[];
		this.response = '';
		this.footerclass = "modal-footer";
	}

	send_request(claim_unq_id, assessorid, template) {
		this.spinner.show();
		console.log('send request details:' + claim_unq_id + ',' + assessorid);
		console.log('scheduledatetime:' + this.sdt);
		this.apiService.send_request_to_assessor(claim_unq_id, assessorid, this.sdt).subscribe(
			data => {
				this.spinner.hide();
				console.log("Response :" + JSON.stringify(data));
				this.request_status = false; //fine
				this.requestresponse = data.text;
				this.srtamodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));

			},
			error => {
				this.spinner.hide();
				this.request_status = true;//not fine
				this.requestresponse = 'Something went wrong on server side!!';
				this.srtamodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));
			});
	}

	sendrequesttoall(claim_unq_id, event, template) {
		//console.log('checked:'+event.target.checked); 

		var listassessor = this.assessorList.map(function (assessor) {
			return assessor.id;
		});
		console.log('send request to all details:' + claim_unq_id);
		console.log('scheduledatetime:' + this.sdt);
		this.spinner.show();
		if ((listassessor.length > 0) && (claim_unq_id != '')) {

			this.apiService.send_request_to_all_assessor(claim_unq_id, listassessor, this.sdt).subscribe(
				data => {
					this.spinner.hide();
					console.log("Response :" + JSON.stringify(data));
					this.request_status = false; //fine
					this.requestresponse = data.text;
					this.srtamodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));
					//this.toastr.success('Response!', data.text);

				},
				error => {
					this.spinner.hide();
					this.request_status = true;//not fine
					this.requestresponse = 'Something went wrong on server side!!';
					this.srtamodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));
					//this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
		else {
			this.spinner.hide();
			this.request_status = true;
			this.requestresponse = 'List of nearest assessor is empty';
			this.srtamodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));

		}

	}

	onRatingChange($event: RatingChangeEvent) {
		console.log('onRatingUpdated $event: ', $event.rating);
		this.rating = $event.rating;
	};

	save_rating() {
		var message = this.assessorratingform.value.message;
		console.log(`rating Message is: ${message}`);
		console.log(`claim_id: ${this.claimdata.id}`);
		console.log(`assessor_id: ${this.claimdata.assessor.id}`);
		if (this.rating == 0) {
			this.ratingFlag = true;
			this.ratingresponse = 'Rating is required';
		}
		else {
			this.spinner.show();
			this.apiService.store_toassessor_rating(this.claimdata.id, this.claimdata.assessor.id, message, this.rating).subscribe(
				data => {
					this.spinner.hide();
					console.log("Response :" + JSON.stringify(data));
					if (data.error == true) {
						this.ratingFlag = true;
						this.ratingresponse = data.text;
						this.toastr.warning('Response!', data.text);
						this.ratingresponse = '';
					}
					else {
						this.ratingFlag = false;
						this.ratingresponse = data.text;
						this.claimdata.status = data.result.claim_status;
						this.toastr.success('Response!', data.text);
						this.ratingresponse = '';
						this.assessorratingRef.hide();
					}
				},
				error => {
					this.spinner.hide();
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
	}

	sendOfferToAll(claim_unq_id: any) {
		if ((this.currentlat !='') && (this.currentlng != '')) {
			let form_data = {
				currentlat: this.currentlat,
				currentlng: this.currentlng,
				claim_unq_id: claim_unq_id
			};
			this.spinner.show();
			this.apiService.send_offer_toAll_garage(form_data).subscribe(
				data => {
					this.spinner.hide();
					console.log("Response :" + JSON.stringify(data));
					if (data.error == false) {
						this.ratingFlag = false;
						this.response = data.text;
						this.claimdata.status = data.result[0].claim_status;
						this.toastr.success('Response!', data.text);
						this.garageOffers_status=false;
						this.garageOffers_response ='No garage has placed offer right now,we will notify you through sms.';
						document.getElementById('grgclosebtn').click();

					}
					else {
						this.ratingFlag = true;
						this.response = "No Garage found nearer to your location!!";
						this.toastr.warning('Response!', 'No Garage found nearer to your location!!');
					}
				},
				error => {
					this.spinner.hide();
					this.toastr.error('Response!', 'Something went wrong on server side!!');

				});
		}
		else {
			console.log('Location not found');
			this.response = 'Location not found';
			this.toastr.warning('Response!', 'Location not found');
		}
	}


	accept_offer(index: number, garage_offer_id: number) {
		var formdata = {
			offer_status: 'accepted',
			garage_offer_id: garage_offer_id,
			garage_contact_name: this.garageOffers[index].garage_info.Contact_name,
			garage_email: this.garageOffers[index].garage_info.email,
			garage_cell_number: this.garageOffers[index].garage_info.cell_phone_number,
			client_name: this.claimdata.Insured_name,
			client_number: this.claimdata.Insured_cellphone,
			claim_unq_id: this.garageOffers[index].claim_unq_id
		}
		
		this.apiService.update_garage_offer_status(formdata).subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.garageOffers_status = false;
					this.garageOffers_response = data.text;
					this.claimdata.status = data.result.claim_status;
					this.garageOffers = [];
				}
				else {
					this.garageOffers_status = true;
					this.garageOffers_response = data.text;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');

			});
	}

	declined_offer(index: number, garage_offer_id: number) {
		var formdata = {
			offer_status: 'declined',
			garage_offer_id: garage_offer_id,
			garage_contact_name: this.garageOffers[index].garage_info.Contact_name,
			garage_email: this.garageOffers[index].garage_info.email,
			garage_cell_number: this.garageOffers[index].garage_info.cell_phone_number,
			client_name: this.claimdata.Insured_name,
			client_number: this.claimdata.Insured_cellphone,
			claim_unq_id: this.garageOffers[index].claim_unq_id
		}
	
		this.apiService.update_garage_offer_status(formdata).subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.garageOffers_status = false;
					this.garageOffers_response = data.text;
					this.garageOffers.splice(index, 1);
					this.claimdata.num_ofgarage_offered = this.claimdata.num_ofgarage_offered - 1;
				}
				else {
					this.garageOffers_status = true;
					this.garageOffers_response = data.text;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');

			});
	}
	confirm_now(e) {
	
		e.target.disabled = true;
		var formdata = {
			claim_unq_id: this.claimdata.claim_unq_id,
			garage_id: this.claimdata.garage_id,
			client_name: this.claimdata.Insured_name,
			client_number: this.claimdata.Insured_cellphone,
			status: 9 //job-completed
		};
		this.apiService.update_job_status_fr_client(formdata).subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.toastr.success('Response!', data.text);
					this.claimdata.status = 'job-completed';
					this.garage_name
					document.getElementById('jbclosebtn').click();
				}
				else {
					this.toastr.warning('Response!', data.text);
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');

			});
	}

	unconfirm_now(e) {
	
		e.target.disabled = true;
		var formdata = {
			claim_unq_id: this.claimdata.claim_unq_id,
			garage_id: this.claimdata.garage_id,
			client_name: this.claimdata.Insured_name,
			client_number: this.claimdata.Insured_cellphone,
			status: 8 //job-pending
		};
		this.apiService.update_job_status_fr_client(formdata).subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.toastr.success('Response!', data.text);
					this.claimdata.status = 'job-pending';
					document.getElementById('jbclosebtn').click();
				}
				else {
					this.toastr.warning('Response!', data.text);
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});
	}

	save_garage_rating() {
		var message = this.garageratingform.value.message;
		console.log(`rating Message is: ${message}`);
		console.log(`claim_id: ${this.claimdata.id}`);
		console.log(`garage_id: ${this.claimdata.garage_id}`);
		if (this.rating == 0) {
			this.garage_ratingFlag = true;
			this.garage_ratingresponse = 'Rating is required';
		}
		else {
			this.apiService.store_togarage_rating(this.claimdata.id, this.claimdata.garage_id, message, this.rating).subscribe(
				data => {
					console.log("Response :" + JSON.stringify(data));
					if (data.error == true) {
						this.garage_ratingFlag = true;
						this.garage_ratingresponse = data.text;
						setTimeout(() => {
							this.garage_ratingresponse = '';
						}, 2000);
					}
					else {
						this.garage_ratingFlag = false;
						this.garage_ratingresponse = data.text;
						this.toastr.success('Response!',data.text);
						this.garageratingRef.hide();
						document.getElementById('findclaimbtn').click();
						setTimeout(() => {
							this.garage_ratingresponse = '';
							//this.claimdata.status='garage-rated';
						}, 1000);
					}
				},
				error => {
					this.toastr.error('Response!', 'Something went wrong on server side!!');
				});
		}
	}

	onAddressChange(address: any) {
		this.currentlat = '';
		this.currentlng = '';
		this.response = '';
		//console.log(address);
		console.log(address.geometry.location.lng());
		console.log(address.geometry.location.lat());
		this.currentlat = address.geometry.location.lat();
		this.currentlng = address.geometry.location.lng();
		if (this.currentlat != '' && this.currentlng != '') {
			this.btn_status = true;
		}
	}

	getcorrectdatetime(str) {
		var date = new Date(str),
			mnth = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2),
			hour = ("0" + date.getHours()).slice(-2),
			minute = ("0" + date.getMinutes()).slice(-2),
			seconds = ("0" + date.getSeconds()).slice(-2)
		var d = [date.getFullYear(), mnth, day].join("-");
		return d + ' ' + hour + ':' + minute + ':' + seconds;
	}

	now(template: TemplateRef<any>) {
		this.schedulenow = true;
		this.firstmodal.hide();
		this.refresh_modal();
		setTimeout(() => {
			this.assessormodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
		}, 500);

	}

	later(template: TemplateRef<any>) {
		this.schedulenow = false;
		this.firstmodal.hide();
		this.refresh_modal();
		setTimeout(() => {
			this.assessormodalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
		}, 500);
	}

	handler(type: string, $event: ModalDirective) {
		// console.log(
		//   `event ${type} is fired${$event.dismissReason
		// 	? ', dismissed by ' + $event.dismissReason
		// 	: ''}`
		// );
	}


}
