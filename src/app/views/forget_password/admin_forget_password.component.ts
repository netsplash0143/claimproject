import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'admin_forget_password.component.html'
})
export class AdminForgetPasswordComponent {

  garage_form: FormGroup;
  garageUpdatePassword_form: FormGroup;
  user_id: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router) { }

  ngOnInit() {
    console.log('Admin Forget password component');
    this.garage_form = new FormGroup({
      mobile_number: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ]))
    });

    this.garageUpdatePassword_form = new FormGroup({
      code: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      newpassword: new FormControl('', Validators.required)
    });
  }

  adminForgetPassword() {
    let mobile_number = this.garage_form.value.mobile_number;

    this.apiService.adminForgetPassword(mobile_number).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.toastr.success('Response!', data.text);
        }
        else {
          this.toastr.warning('Response!', data.text);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      }
    );
  }

  adminUpdatePassword() {
    let code = this.garageUpdatePassword_form.value.code;
    let newpassword = this.garageUpdatePassword_form.value.newpassword;

    this.apiService.adminUpdatePassword(code, newpassword).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.toastr.success('Response!', data.text);
          this.router.navigate(['/login']);
        }
        else {
          this.toastr.warning('Response!', data.text);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

}
