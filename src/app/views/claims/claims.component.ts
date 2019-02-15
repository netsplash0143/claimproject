import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../api.service';

@Component({
  templateUrl: 'claims.component.html'
})
export class ClaimsComponent implements OnInit {
  user_id: any;
  claims_list: any = [];
  response: any;
  response_status: any = false;

  constructor(private apiService:ApiService,
    public router: Router) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.apiService.get_claim_list(this.user_id).subscribe(
      data => {
        // console.log("Response :"+JSON.stringify(data));
        if(data.error == false){
          this.claims_list = data.result;
        }
      },
      error => {
        console.log("Error :"+JSON.stringify(error));
      }
    );
  }

  delete_claim(claim_id){
    console.log("claim_id :"+claim_id);
    this.apiService.delete_claim(claim_id).subscribe(
      data => {
        console.log("Response :"+JSON.stringify(data));
        if(data.error == false){
          this.response = data.text;
          this.response_status = true;
          setTimeout(()=>{
                location.reload();
           }, 3000);
        }
      },
      error => {
        console.log("Error :"+JSON.stringify(error));
      }
    );    
  }

  claim_info(claim_id){
    console.log("claim_id :"+claim_id);
    this.router.navigate(['/claims/viewClaim', { claim_id: claim_id }]);   
  }
  
}
