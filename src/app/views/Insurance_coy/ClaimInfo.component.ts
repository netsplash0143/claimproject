import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'ClaimInfo.component.html'
})
export class ClaimInfoComponent implements OnInit {
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

  constructor(public router: Router,
    private activeroute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    console.log('Claiminfo component initialized');


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

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }

}
