import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forget_password.component.html'
})
export class ForgetPasswordComponent {
  validations_form: FormGroup;
  userUpdatePassword_form: FormGroup;
  user_id: any;
  private sub: any;

  constructor(public formBuilder: FormBuilder, 
  	private apiService:ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public router: Router) {}

  ngOnInit() {
  	this.validations_form = new FormGroup({
	    mobile_number: new FormControl('', Validators.compose([
				Validators.minLength(10),
				Validators.required
			]))
	  });

    this.userUpdatePassword_form = new FormGroup({
      code: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      newpassword : new FormControl('',Validators.required)
    });
  }

  ForgetPassword(){
  	let mobile_number = this.validations_form.value.mobile_number;

	  this.apiService.ForgetPassword(mobile_number).subscribe(
        data => {
          
          	if(data.error == false){
              this.toastr.success('Response!', data.text);
          		// this.router.navigate(['/login']);
            }
            else
            {
              this.toastr.warning('Response!', data.text);
            }
        },
        error => {
          this.toastr.error('Response!', 'Something went wrong on server side!!');
        }
    );
  }

  userUpdatePassword(){
    let code = this.userUpdatePassword_form.value.code;
    let newpassword = this.userUpdatePassword_form.value.newpassword;
    this.apiService.UpdatePassword(code,newpassword).subscribe(
        data => {
            
            if(data.error == false){
              this.toastr.success('Response!', data.text);
               this.router.navigate(['/login']);
              }
              else
              {
                this.toastr.warning('Response!', data.text);
              }
        },
        error => {
          this.toastr.error('Response!', 'Something went wrong on server side!!');
        }
    );
  }

  login(){
    this.router.navigate(['/login']);
  }

}
