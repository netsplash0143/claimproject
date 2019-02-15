import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  templateUrl: 'InsuranceCoy.component.html'
})
export class InsuranceCoyComponent implements OnInit {
  ins_id: any;
  role: any;
  name: any;
  activeclaims: any = [];
  oldclaims: any = [];
  companylist: any = [];
  assessorlist: any = [];
  garagelist: any = [];
  pwdform: FormGroup;
  validations_form: FormGroup;
  logo: any;
  companyinfo: any = [];
  selectedfile:any='';
  btnname:any='Upload';


  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router) {
    console.log('InsuranceCoy Component initialized');
    this.ins_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    this.name = localStorage.getItem('name');

    this.apiService.InsCoy_active_list(this.ins_id).subscribe(data => {

      if (data.error == false) {
        this.activeclaims = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });

    this.apiService.InsCoy_oldclaim_list(this.ins_id).subscribe(data => {
      if (data.error == false) {
        this.oldclaims = data.result;
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });


    this.validations_form = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      logofile: new FormControl('')
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

    this.apiService.get_company_information(this.ins_id).subscribe(data => {
      if (data.error == false) {
        this.validations_form.patchValue(data.result);
        this.logo = data.result.logo;
        this.companyinfo = data.result;
      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    }, error => {
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
  }

  ngOnInit(): void {

  }


  updatepassword(){
    console.log(this.pwdform.value);
    this.apiService.inscoy_change_password(this.ins_id,this.pwdform.value).subscribe(data=>{
      if(data.error==false){
        this.toastr.success('Response!', data.text);
      }
      else{
        this.toastr.warning('Response!', data.text);
      }
    },error=>{
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
  }
  
  onFileselected(e){
    console.log(e.target.files[0]);
   
    this.selectedfile=<File>e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url
    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.logo = event.target.result;
      this.btnname=e.target.files[0].name;
    } 
   
  }
  
  updateCoy(){
    console.log('update submit for ins_id:'+this.ins_id);
    console.log(this.validations_form.value);
  
    let form_data = {
      name:this.validations_form.value.name,
      address : this.validations_form.value.address,
      zipcode:this.validations_form.value.zipcode,
      ins_id:this.ins_id
    };
  
    console.log(form_data);
  
    this.apiService.update_Insurance_coy(this.selectedfile,form_data).subscribe(
      data => {
        if(data.result)
        {
          this.toastr.success('Response!', data.text);
          this.companyinfo=data.result;
          localStorage.setItem('avatar',data.result.logo);
          localStorage.setItem('name',data.result.name);
          this.btnname='Upload';

        }
        else{
          this.toastr.warning('Response!', data.text);
  
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }
  onAddressChange(address:any){
    this.validations_form.value.address=address.formatted_address;
  }

}
