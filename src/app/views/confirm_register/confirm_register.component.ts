import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'confirm_register.component.html'
})
export class ConfirmRegisterComponent {
  validations_form: FormGroup;
  user_id: any;
  sub: any;

  constructor(public formBuilder: FormBuilder, 
  	private apiService:ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public router: Router,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {

  	this.validations_form = new FormGroup({
	  confirmation_code: new FormControl('', Validators.compose([
				Validators.minLength(4),
				Validators.required
			]))
	});

	this.sub = this.route.params.subscribe(params => {
       this.user_id = +params['user_id'];
       console.log("Params User Id :"+this.user_id);
    });
  }

  confirm_register(){
  	let confirmation_code = this.validations_form.value.confirmation_code;
    this.spinner.show();
	  this.apiService.confirm_register(this.user_id,confirmation_code).subscribe(
        data => {
          this.spinner.hide();
          	console.log("Response :"+JSON.stringify(data));
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
          this.spinner.hide();
          this.toastr.error('Response!', 'Something went wrong on server side!!');
        }
    );
  }

}
