import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'oldClaim.component.html'
})
export class OldClaimComponent implements OnDestroy, OnInit {

  claimrequestList= [];
  user_id:any; 
	response:any='';
	errflag:boolean=false;
	p: number = 1;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any>= new Subject();
	
	constructor(private apiService:ApiService,
		private toastr: ToastrService,
		public router: Router){}

  ngOnInit(){
    this.user_id = localStorage.getItem('user_id');
		 console.log('OldClaimComponent init');
		 
		 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
		};
		
     this.apiService.get_old_claim_request_list(this.user_id).subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.claimrequestList = data.result;
				// Calling the DT trigger to manually render the table
					this.dtTrigger.next();
				}
				else
				{
					this.errflag=true;
					this.response=data.text;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});
	}

	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
