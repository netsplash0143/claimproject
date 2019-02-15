import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'ClaimInfo.component.html'
})
export class ClaimInfoComponent implements OnInit {
  user_id: any;
  errflag: boolean = false;
  response: any = '';
  errflag2: boolean = false;
  response2: any = '';
  claimid: any;
  paramSubscription: Subscription;
  claimdata: any;
  jobstart: any='NO';
  jobcomplete: any='NO';
  jobdone:any='NO';
  job_current_status: any = 'NO';
  assessor_basic_detail:boolean=false;
  garage_basic_detail:boolean=false;

  constructor(public router: Router,
    private activeroute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    console.log('Claiminfo component initialized');
    this.user_id = localStorage.getItem('user_id');

    this.paramSubscription = this.activeroute.paramMap.subscribe(params => {
      this.claimid = params.get("claimid");
      console.log('claimid:' + this.claimid);
    });

    this.apiService.get_complete_claim_info(this.claimid).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.errflag = false;
          this.claimdata = data.result;
          this.assessor_basic_detail=this.Iskeyexist(data.result,'assessor_basic_detail');
          this.garage_basic_detail=this.Iskeyexist(data.result,'garage_basic_detail');
          if (data.result.jobstart == true) {
            this.jobstart ='YES'
          }
          if (data.result.jobdone == true) {
            this.jobdone = 'YES';
          }
          if (data.result.jobcomplete == true) {
            this.jobcomplete = 'YES';
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

  Iskeyexist(obj,key) {
       if (obj.hasOwnProperty(key)) {
          return true;
       }
    return false;
}

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }

}
