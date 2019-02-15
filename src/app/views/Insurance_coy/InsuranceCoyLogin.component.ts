import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'insurance-login',
	templateUrl: 'InsuranceCoyLogin.component.html'
})
export class InsuranceCoyLoginComponent {
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
			username: new FormControl('', Validators.compose([
				Validators.minLength(3),
				Validators.required
			])),
			password: new FormControl('', Validators.required)
		});

	}

	login() {
		let username = this.validations_form.value.username;
		let password = this.validations_form.value.password;

		this.apiService.loginAsInsuranceCoy(username, password).subscribe(
			data => {

				if (data.error == false) {
					localStorage.setItem('user_id', data.result.user_id);
					localStorage.setItem('avatar', data.result.avatar);
					localStorage.setItem('role', data.result.role);
					this.toastr.success('Response!', data.text);
					this.router.navigate(['/insurance-dashboard']);
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
