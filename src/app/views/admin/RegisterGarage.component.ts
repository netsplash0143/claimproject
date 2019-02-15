import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


@Component({
  templateUrl: 'RegisterGarage.component.html'
})
export class RegisterGarageComponent implements OnDestroy, OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  user_id: any;
  role: any;
  garagelist: any = [];
  garageinfo: any = {};
  selectedfile: any = '';
  garage_form: FormGroup;
  confirmform: FormGroup;
  pwdform: FormGroup;
  garageaddress: any = '';
  isedit: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  garage_id: any;
  index: any;
  garagelat: any='';
  garagelng: any='';
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
    console.log(`RegisterGarageComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);

    this.garage_form = new FormGroup({
			Name: new FormControl('', Validators.compose([
				Validators.minLength(5),
				Validators.required
			])),
			Contact_name: new FormControl('', Validators.compose([
				Validators.minLength(5),
				Validators.required
			])),
			business_id_number: new FormControl('', Validators.required),
			License_number: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			cell_phone_number: new FormControl('', Validators.required),
			city: new FormControl('', Validators.required),
			password: new FormControl('', Validators.compose([
				Validators.maxLength(25),
				Validators.minLength(5),
				Validators.required
			])),
			authorized_importer: new FormControl('', Validators.required)
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

    this.apiService.get_garage_complete_list().subscribe(data => {
      console.log("Response :" + JSON.stringify(data));
      if (data.error == false) {
        this.garagelist = data.result;
        this.dtTrigger.next();
      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

  }

  register() {
    if (this.garage_form.invalid) {
      return;
    }
    let form_data = {
      Name: this.garage_form.value.Name,
			contact_name: this.garage_form.value.Contact_name,
			email: this.garage_form.value.email,
			cell_phone_number: this.garage_form.value.cell_phone_number,
      password: this.garage_form.value.password,
      License_number:this.garage_form.value.License_number,
			business_id_number: this.garage_form.value.business_id_number,
			city: this.garageaddress,
			authorized_importer: this.garage_form.value.authorized_importer,
			latitude:this.garagelat,
      longitude:this.garagelng
    };
    console.log("Form Data :" + JSON.stringify(form_data));
    this.apiService.register_assessor(form_data).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.toastr.success('Response!', data.text);
          this.garagelist.push(data.result);
          this.garage_form.reset();
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

  onGarageAddressChange(address: any) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    this.garageaddress = address.formatted_address;
    this.garagelat = address.geometry.location.lat();
    this.garagelng = address.geometry.location.lng();
  }

  resetform() {
    this.garage_form.reset();
    this.is_confirmed_trigger = false;
  }
  confirm_register() {
    let confirmation_code = this.garage_form.value.confirmation_code;

    this.apiService.confirm_register(this.garage_id, confirmation_code).subscribe(
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
    if (this.garageinfo.active==1) {
      active = 0;  //deactivate
    }
    else {
      active = 1;
    }
    this.apiService.change_status_garage(this.garage_id, active).subscribe(data => {
      if (data.error == false) {
        this.toastr.success('Response!', data.text);
        this.garagelist[this.index].active =active;
        this.garageinfo.active=active;
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
    this.garage_id = assessor_id;
    this.index = index;
    this.is_confirmed_trigger = true;
  }


  edit_garage(garage_id: number, index: number) {
    this.isedit = true;
    this.garage_id = garage_id;
    this.index = index;
    this.apiService.get_garage_info(garage_id).subscribe(data => {
      if (data.error == false) {
        this.garage_form.patchValue(data.result);
        this.garageinfo = data.result;

      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
  }

  cancelconfirm() {
    this.garage_id = '';
    this.index = '';
    this.confirmform.reset();
    this.is_confirmed_trigger = false;
  }

  cancelupdate() {
    this.isedit = false;
    this.garage_id = '';
    this.index = '';
    this.garage_form.reset();
    this.garageinfo = {};
    this.is_confirmed_trigger = false;
  }

  updatepassword() {
    this.apiService.change_my_password(this.garage_id, this.pwdform.value.currentpassword, this.pwdform.value.newpassword, 'assessor').subscribe(data => {
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

  updateGarage() {
   
    var form_data = {
        Name: this.garage_form.value.Name,
        Contact_name: this.garage_form.value.Contact_name,
        License_number:this.garage_form.value.License_number,
        email:this.garage_form.value.email,
        cell_phone_number: this.garage_form.value.cell_phone_number,
        city: this.garageaddress,
        latitude: this.garagelat,
        longitude: this.garagelng,
        business_id_number: this.garage_form.value.business_id_number,
        authorized_importer:this.garage_form.value.authorized_importer
      };
    this.apiService.update_garage_complete_profile(form_data,this.garage_id).subscribe(
      data => {
        if (data.error==false) {
          this.toastr.success('Response!', data.text);
          this.garagelist[this.index] = data.result;
          this.garageinfo=data.result;
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
