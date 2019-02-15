import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'admin-login',
	templateUrl: 'AdminLogin.component.html'
})
export class AdminLoginComponent {
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

	}

	loginAsAdmin() {
		let mobile_number = this.validations_form.value.mobile_number;
		let password = this.validations_form.value.password;

		this.apiService.loginAsAdmin(mobile_number, password).subscribe(
			data => {

				if (data.error == false) {
					localStorage.setItem('user_id', data.result.user_id);
					localStorage.setItem('avatar', data.result.avatar);
					localStorage.setItem('role', 'admin');
					this.toastr.success('Response!', data.text);
					this.router.navigate(['/admin-dashboard']);
				}
				else if (data.error == true) {
					this.error = true;
					this.error_msg = data.text;
					this.toastr.warning('Response!', data.text);
					setTimeout(() => {
						this.error = false;
					}, 3000);
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			}
		);
	}

	redirect_forget_admin_password() {
		this.router.navigate(['/admin_forget_password']);
	}

}
