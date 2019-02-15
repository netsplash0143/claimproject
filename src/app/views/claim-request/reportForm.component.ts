import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl,FormArray } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'reportForm.component.html'
})
export class ReportFormComponent implements OnInit {
  validations_form: FormGroup;
  user_id: any;
  response: any='';
  errflag: any = false;
  claim_unq_id:any;
  paramSubscription:Subscription;
  prevreportfile:any='';
  selectedfile: any = '';
  fileurl:any='';

  constructor(public router: Router,
    private activeroute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService:ApiService) { }

  ngOnInit() {
    console.log('Report Form component initialized');
    this.user_id = localStorage.getItem('user_id');
    this.paramSubscription=this.activeroute.paramMap.subscribe(params => {
      this.claim_unq_id = params.get("claim_unq_id");
      console.log('claim_unq_id:'+this.claim_unq_id);
    });
    this.validations_form = new FormGroup({
      reportfile: new FormControl('',Validators.required),
      assessor_charge: new FormControl('',Validators.required),
      spareparts_amount: new FormControl('',Validators.required)
    });
  }

  onFileselected(e){
    console.log(e.target.files[0]);
    this.selectedfile = <File>e.target.files[0];
    let form_data = {
      prevlogofile:this.prevreportfile
      };
      this.apiService.get_file_url(this.selectedfile, form_data).subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (data.result) {
            this.fileurl=data.result.file_url;
            this.prevreportfile=data.result.file_name;
        }
        else {
        this.toastr.warning('Response!', data.text);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });	
  }


  submitform(){
 
    let form_data = {
      claim_unq_id:this.claim_unq_id,
      assessor_id : this.user_id,
      assessor_charge:this.validations_form.value.assessor_charge,
      spareparts_amount:this.validations_form.value.spareparts_amount,
    };
    //console.log("Form Data :"+JSON.stringify(this.validations_form.value));
    this.apiService.update_assessment_report(this.fileurl,form_data).subscribe(
      data => {
        if(data.result)
        {
          this.toastr.success('Response!', data.text);
          this.router.navigate(['/assessor/activeclaims']);
        }
        else{
          this.toastr.warning('Response!', data.error);
        }
       
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }  

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
}
  
}
