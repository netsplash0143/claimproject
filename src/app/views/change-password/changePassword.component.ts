import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: 'changePassword.component.html'
})
export class changePasswordComponent implements OnInit {

	claimrequestList= [];
  userUpdatePassword_form: FormGroup;
  user_id:any; 
  role:any=''; 
	response:any='';
	errflag:boolean=false;
	p: number = 1;
  constructor(private apiService:ApiService,public router: Router,public formBuilder: FormBuilder){}

  ngOnInit(){
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
     console.log(`changePasswordComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);
     this.userUpdatePassword_form = new FormGroup({
      currentpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newpassword : new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  
	userUpdatePassword(){
      var newpassword=this.userUpdatePassword_form.value.newpassword;
      var currentpassword=this.userUpdatePassword_form.value.currentpassword;
      if(this.role!='undefined'|| this.role!='')
        {
          console.log(`role ${this.role}`);
          console.log(`type ${typeof this.role}`);
         
            this.apiService.change_my_password(this.user_id,currentpassword,newpassword,this.role).subscribe(
              data => {
                console.log("Response :"+data.text);
                if(data.result)
                {
                  this.errflag=false;
                  this.response=data.text;
                }
                else{
                  this.errflag=true;
                  this.response=data.text;
                }
              
              },
              error => {
               // console.log("Error :"+JSON.stringify(error));
                this.errflag=true;
                this.response=error;
              });
         
        }
        else
        {
          console.log(`role ${this.role}`);
          console.log(`type ${typeof this.role}`);
        }
    }
  

}
