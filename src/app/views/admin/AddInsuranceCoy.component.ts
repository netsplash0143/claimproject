import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


@Component({
  templateUrl: 'AddInsuranceCoy.component.html'
})
export class AddInsuranceCoyComponent implements OnDestroy, OnInit {
  
	@ViewChild('places') places: GooglePlaceDirective;
  user_id: any;
  role: any;
  companylist: any=[];
  companyinfo:any={};
  selectedfile:any='';
  validations_form: FormGroup;
  pwdform:FormGroup;  
  address:any='';
  isedit:boolean=false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();
  ins_id:any;
  index:any;
  logo:any='';
  btnname:any='Upload';

  constructor(private apiService: ApiService,private toastr: ToastrService, public router: Router, public formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    console.log(`AddInsuranceCoyComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);
    
    this.validations_form = new FormGroup({
			name: new FormControl('', Validators.required),
			address: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      logofile: new FormControl('')
    });

    this.pwdform=  new FormGroup({
      currentpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newpassword : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
    this.apiService.get_complete_company_list().subscribe(data=>{
      console.log("Response :" + JSON.stringify(data));
      if (data.error == false) {
        this.companylist = data.result;
        this.dtTrigger.next();
      }
      else {
        this.toastr.warning('Response!', data.text);
      }
    },error=>{
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    })
  }

  RegisterCoy(){
    if(this.validations_form.invalid){
      return;
    }
    let form_data = {
      name:this.validations_form.value.name,
      address : this.validations_form.value.address,
      zipcode:this.validations_form.value.zipcode
    };
    console.log("Form Data :"+JSON.stringify(this.validations_form.value));
    this.apiService.register_Insurance_coy(this.selectedfile,form_data).subscribe(
      data => {
        console.log("Response :"+data);
        if(data.result)
        {
          this.toastr.success('Response!', data.text);
          this.companylist.push(data.result);
          this.validations_form.reset();
        }
        else{
          this.toastr.warning('Response!', data.error);
        }
       
      },
      error => {
        console.log("Error :"+JSON.stringify(error));
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
  onAddressChange(address: any) {
		console.log(address.formatted_address);
    this.validations_form.value.address=address.formatted_address;
	}

  resetform(){
    this.validations_form.reset();
    this.logo='';
  }

  remove_coy(ins_id:number,index:number){
    this.apiService.remove_insurance_coy(ins_id).subscribe(data=>{
          if(data.error==false){
            this.toastr.success('Response!', data.text);
            this.companylist.splice(index, 1);
          }
          else
          {
            this.toastr.warning('Response!', data.text);
          }
    },error=>{
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    });
}

edit_coy(ins_id:number,index:number){
    this.isedit=true;
    this.ins_id=ins_id;
    this.index=index;
    this.apiService.get_company_information(ins_id).subscribe(data=>{
        if(data.error==false){
          this.validations_form.patchValue(data.result);
          this.logo=data.result.logo;
          this.companyinfo=data.result;
        }
        else
        {
          this.toastr.warning('Response!', data.text);
        }
    },error=>{  
      this.toastr.error('Response!', 'Something went wrong on server side!!');
    }); 
}

cancelupdate(){
  this.isedit=false;
  this.ins_id='';
  this.index='';
  this.validations_form.reset();
  this.companyinfo={};
  this.logo='';
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
        this.companylist[this.index]=data.result;
        this.validations_form.value.logofile='';
        this.cancelupdate();
       
      }
      else{
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
