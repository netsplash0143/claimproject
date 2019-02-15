import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  templateUrl: 'viewclaim.component.html'
})
export class ViewClaimComponent implements OnInit {
  user_id: any;
  private sub: any;
  claim_id: any;
  claim_details: any;

  constructor(public router: Router,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService:ApiService) {

    this.sub = this.route.params.subscribe(params => {
       this.claim_id = +params['claim_id'];
       console.log("Params Claim Id :"+this.claim_id);
       this.get_claim_info(this.claim_id);
    });
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
  }

  get_claim_info(claim_id: any){
    this.apiService.get_claim_info(claim_id).subscribe(
      data => {
        console.log("Response :"+JSON.stringify(data));
        if(data.error == false){
          this.claim_details = data.result;
        }
      },
      error => {
        console.log("Error :"+JSON.stringify(error));
      }
    ); 
  }
  
}
