import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'JobDetails.component.html'
})
export class JobDetailsComponent implements OnInit {
  status_form: FormGroup;
  user_id: any;
  errflag: boolean = false;
  response: any = '';
  errflag2: boolean = false;
  response2: any = '';
  garage_offer_id: any;
  paramSubscription: Subscription;
  claimdata: any;
  isjobstarted: boolean = false;
  jobcomplete: boolean = false;
  job_current_status: any = 'NO';

  constructor(public router: Router,
    private activeroute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    console.log('JobDetailsComponent initialized');
    this.user_id = localStorage.getItem('user_id');

    this.paramSubscription = this.activeroute.paramMap.subscribe(params => {
      this.garage_offer_id = params.get("garage_offer_id");
      console.log('garage_offer_id:' + this.garage_offer_id);
    });

    this.status_form = new FormGroup({
      jobstart: new FormControl('', Validators.required),
      jobdone: new FormControl('')
    });

    this.apiService.get_complete_claimJob_details(this.garage_offer_id).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.errflag = false;
          this.claimdata = data.result;
          this.status_form.patchValue(data.result);
          if (data.result.jobstart == true) {
            this.isjobstarted = true;
          }
          else{
            this.isjobstarted=false;
          }
          if (data.result.jobcomplete == true) {
            this.job_current_status = 'YES';
            this.jobcomplete=true;
          }
          else{
            this.isjobstarted=false;
          }
    
        }
        else {
          this.errflag = true;
          this.response = data.text;
        }
      },
      error => {
        console.log("Error :" + JSON.stringify(error));
        this.errflag = true;
        this.response = error;
      });
  }
  oncheckoption1(e) {

    if (e.target.checked) {
      this.isjobstarted = true;
    }

  }

  update_job_status() {
    console.log(this.status_form.value);
    var formdata;
    if (this.status_form.value.jobdone == true && this.claimdata.jobdone == false) {
      formdata = {
        claim_unq_id: this.claimdata.claim_unq_id,
        garage_offer_id: this.garage_offer_id,
        status: 7, //job-done-by-garage
        Insured_cellphone: this.claimdata.Insured_cellphone,
        Insured_name: this.claimdata.Insured_name
      };

      this.apiService.update_job_status(formdata).subscribe(
        data => {
          console.log("Response :" + data.text);
          if (data.error == false) {
            this.errflag2 = false;
            this.response2 = data.text;
            this.claimdata.jobdone=true;
            this.claimdata.status=data.result.status;
            setTimeout(() => {
              this.response2 = '';
            }, 2000);
          }
          else {
            this.errflag2 = true;
            this.response2 = data.text;
          }

        },
        error => {
          console.log("Error :" + JSON.stringify(error));
          this.errflag2 = true;
          this.response2 = error;
        });

    } else if (this.status_form.value.jobstart == true && this.claimdata.jobstart==false) {
      formdata = {
        claim_unq_id: this.claimdata.claim_unq_id,
        garage_offer_id: this.garage_offer_id,
        status: 6,  //job-started
        Insured_cellphone: this.claimdata.Insured_cellphone,
        Insured_name: this.claimdata.Insured_name
      };
      this.apiService.update_job_status(formdata).subscribe(
        data => {
          console.log("Response :" + data.text);
          if (data.error == false) {
            this.errflag2 = false;
            this.response2 = data.text;
            this.claimdata.status=data.result.status;
            setTimeout(() => {
              this.response2 = '';
            }, 2000);
          }
          else {
            this.errflag2 = true;
            this.response2 = data.text;
          }
        },
        error => {
          console.log("Error :" + JSON.stringify(error));
          this.errflag2 = true;
          this.response2 = error;
        });
    }
    else {
      this.errflag2 = false;
      this.response2 = 'No changes can be performed!!';
    }

  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }

}
