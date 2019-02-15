import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


@Component({
  templateUrl: 'RegisterAssessor.component.html'
})
export class RegisterAssessorComponent implements OnDestroy, OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  user_id: any;
  role: any;
  assessorlist: any = [];
  companylist: any = [];
  assessorinfo: any = {};
  selectedfile: any = '';
  validations_form: FormGroup;
  confirmform: FormGroup;
  pwdform: FormGroup;
  addressfield: any = '';
  isedit: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  assessor_id: any;
  index: any;
  assessorlat: any='';
  assessorlng: any='';
  is_confirmed_trigger: boolean = false;

  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    console.log(`RegisterAssessorComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);

    this.validations_form = new FormGroup({
      Firstname: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      Lastname: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      email: new FormControl('', Validators.required),
      cell_phone_number: new FormControl('', Validators.required),
      Ins_coy_id: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      License_number: new FormControl('', Validators.required),
      Business_id_number: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });


    this.pwdform = new FormGroup({
      currentpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newpassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });

    this.confirmform = new FormGroup({
      confirmation_code: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

    this.apiService.get_assessors_complete_list().subscribe(data => {
      console.log("Response :" + JSON.stringify(data));
      if (data.error == false) {
        this.assessorlist = data.result;
        this.dtTrigger.next();
      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

    this.apiService.get_insurance_company_list().subscribe(
      data => {
        if (data.error == false) {
          this.companylist = data.result;
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });

  }

  register() {
    if (this.validations_form.invalid) {
      return;
    }
    let form_data = {
      Firstname: this.validations_form.value.first_name,
      Lastname: this.validations_form.value.last_name,
      email: this.validations_form.value.email,
      cell_phone_number: this.validations_form.value.cell_phone_number,
      password: this.validations_form.value.password,
      Ins_coy_id: this.validations_form.value.Ins_coy_id,
      city:this.addressfield,
      latitude: this.assessorlat,
      longitude: this.assessorlng,
      Business_id_number: this.validations_form.value.Business_id_number,
      License_number: this.validations_form.value.License_number
    };
    console.log("Form Data :" + JSON.stringify(form_data));
    this.apiService.register_assessor(form_data).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.toastr.success('Response!', data.text);
          this.assessorlist.push(data.result);
          this.validations_form.reset();

        }
        else {
          this.toastr.warning('Response!', data.error);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });


  }

  onFileselected(e) {
    console.log(e.target.files[0]);
    this.selectedfile = <File>e.target.files[0];
  }

  onAssessorAddressChange(address: any) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    this.addressfield = address.formatted_address;
    this.assessorlat = address.geometry.location.lat();
    this.assessorlng = address.geometry.location.lng();
  }

  resetform() {
    this.validations_form.reset();
    this.is_confirmed_trigger = false;
  }
  confirm_register() {
    let confirmation_code = this.validations_form.value.confirmation_code;

    this.apiService.confirm_register(this.assessor_id, confirmation_code).subscribe(
      data => {
       
        if (data.error == false) {
          this.toastr.success('Response!', data.text);
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

  update_status() {
    var active;
    if (this.assessorinfo.active==1) {
      active = 0;  //deactivate
    }
    else {
      active = 1;
    }

    this.apiService.change_status_assessor(this.assessor_id, active).subscribe(data => {
      if (data.error == false) {
        this.toastr.success('Response!', data.text);
        this.assessorlist[this.index].active =active;
        this.assessorinfo.active=active;
        document.getElementById('cancelstate').click();
      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
  }
  openconfirmform(assessor_id: number, index: number) {
    this.assessor_id = assessor_id;
    this.index = index;
    this.is_confirmed_trigger = true;
  }
  edit_assessor(assessor_id: number, index: number) {
    this.isedit = true;
    this.assessor_id = assessor_id;
    this.index = index;
    this.apiService.get_assessor_info(assessor_id).subscribe(data => {
      if (data.error == false) {
        this.validations_form.patchValue(data.result);
        this.assessorinfo = data.result;

      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
  }

  cancelconfirm() {
    this.assessor_id = '';
    this.index = '';
    this.confirmform.reset();
    this.is_confirmed_trigger = false;
  }

  cancelupdate() {
    this.isedit = false;
    this.assessor_id = '';
    this.index = '';
    this.validations_form.reset();
    this.assessorinfo = {};
    this.is_confirmed_trigger = false;
  }

  updatepassword() {
    this.apiService.change_my_password(this.assessor_id, this.pwdform.value.currentpassword, this.pwdform.value.newpassword, 'assessor').subscribe(data => {
      if (data.error == false) {
        this.toastr.success('Response!', data.text);
      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
  }

  updateAssessor() {
   
    var form_data = {
        Ins_coy_id: this.validations_form.value.Ins_coy_id,
        Firstname: this.validations_form.value.Firstname,
        Lastname: this.validations_form.value.Lastname,
        cell_phone_number: this.validations_form.value.cell_phone_number,
        city: this.addressfield,
        latitude: this.assessorlat,
        longitude: this.assessorlng,
        License_number: this.validations_form.value.License_number,
        Business_id_number: this.validations_form.value.Business_id_number,
        user_id: this.assessor_id
      };
    this.apiService.update_assessor_complete_profile(form_data).subscribe(
      data => {
        if (data.error==false) {
          this.toastr.success('Response!', data.text);
          this.assessorlist[this.index] = data.result;
          this.assessorinfo=data.result;
          // this.cancelupdate();
        }
        else {
          this.toastr.warning('Response!', data.text);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
