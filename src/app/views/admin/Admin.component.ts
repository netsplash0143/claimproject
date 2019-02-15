import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  templateUrl: 'Admin.component.html'
})
export class AdminComponent implements OnInit {
  user_id: any;
  role: any;
  activeclaims: any = [];
  oldclaims: any = [];
  companylist: any = [];
  assessorlist: any = [];
  garagelist: any = [];
  manfacturerlist: any = [];
  isnewmanufacture: boolean = false;
  myForm: FormGroup;


  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('Admin Component initialized');
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    this.apiService.admin_active_list().subscribe(data => {
      if (data.error == false) {
        this.activeclaims = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

    this.apiService.admin_oldclaim_list().subscribe(data => {
      if (data.error == false) {
        this.oldclaims = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    })

    this.apiService.get_complete_company_list().subscribe(data => {
      if (data.error == false) {
        this.companylist = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

    this.apiService.get_assessors_complete_list().subscribe(data => {
      if (data.error == false) {
        this.assessorlist = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

    this.apiService.get_garage_complete_list().subscribe(data => {
      if (data.error == false) {
        this.garagelist = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

    
    this.apiService.get_manufacturer_list().subscribe(
      data => {

        if (data.error == false) {
          this.manfacturerlist = data.result;
          console.log(data.result);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });

      // this.myForm = this.formBuilder.group({
      //   manufacture_name: ['', [Validators.required, Validators.minLength(3)]],
      //   vehicle_modal: this.formBuilder.array([
      //     this.initmodal(),
      //   ])
      // });

  }
/*
  initmodal() {
    return this.formBuilder.group({
      modal_name: ['', Validators.required]
    });
  }

  addmodal() {
    const control = <FormArray>this.myForm.controls['vehicle_modal'];
    control.push(this.initmodal());
  }

  removemodal(i: number) {
    const control = <FormArray>this.myForm.controls['vehicle_modal'];
    control.removeAt(i);
  }

  save(formdata: any) {
      console.log(formdata.value);
  }
*/
  ngOnDestroy(): void {
    // this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
    // this.subscription3.unsubscribe();
  }

}
