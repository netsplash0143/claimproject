import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-dashboard',
	templateUrl: 'login.component.html'
})
export class LoginComponent {
	validations_form: FormGroup;
	garage_form: FormGroup;
	error: boolean = false;
	error_msg: any;
	errflag: boolean = false;
	error_text: any;

	constructor(public router: Router,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,
		private apiService: ApiService) { }

	ngOnInit() {
		this.validations_form = new FormGroup({
			mobile_number: new FormControl('', Validators.compose([
				Validators.minLength(10),
				Validators.required
			])),
			password: new FormControl('', Validators.required)
		});

		this.garage_form = new FormGroup({
			mobile_number: new FormControl('', Validators.compose([
				Validators.minLength(10),
				Validators.required
			])),
			password: new FormControl('', Validators.required)
		});


	}

	login() {
		let mobile_number = this.validations_form.value.mobile_number;
		let password = this.validations_form.value.password;

		this.apiService.verifyUser(mobile_number, password).subscribe(
			data => {
				if (data.error == false) {
					localStorage.setItem('user_id', data.result.user_id);
					localStorage.setItem('avatar', data.result.avatar);
					localStorage.setItem('role', data.result.role);
					this.toastr.success('Response!', data.text);
					setTimeout(() => {
						this.router.navigate(['/dashboard']);
					}, 2000);
					
				}
				else if (data.error == true) {
					this.toastr.warning('Response!', data.text);
					this.error = true;
					this.error_msg = data.text;
					setTimeout(() => {
						this.error = false;
					}, 5000);
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			}
		);
	}

	redirect_forget_password() {
		this.router.navigate(['/forget_password']);
	}

}
