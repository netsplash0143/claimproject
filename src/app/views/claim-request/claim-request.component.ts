import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
	templateUrl: 'claim-request.component.html'
})
export class ClaimRequestListComponent implements OnDestroy, OnInit {

	claimrequestList = [];
	user_id: any;
	response: any = '';
	errflag: boolean = false;
	p: number = 1;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();

	constructor(private apiService: ApiService,
		public router: Router,
		private toastr: ToastrService) { }

	ngOnInit() {
		this.user_id = localStorage.getItem('user_id');
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.apiService.get_claim_request_list(this.user_id).subscribe(
			data => {
				console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.claimrequestList = data.result;
					this.dtTrigger.next();
				}
				else {
					this.errflag = true;
					this.response = data.text;
				}
			},
			error => {
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});
	}

	change_claimrequest_status(index: number, claim_unq_id: any, status: any, assessor_id: any) {
		var nstatus;
		this.response = '';
		if (status == 'pending') {
			nstatus = 'active'; //it means accepted
		}
		this.apiService.accept_claim_request(claim_unq_id, nstatus, assessor_id, this.claimrequestList[index].scheduledatetime).subscribe(
			data => {
				//	console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {

					this.claimrequestList[index] = data.result;
					this.toastr.success('Response!', data.text);
				}
				else {
					this.toastr.warning('Response!', data.text);
				}

			},
			error => {
			
				this.toastr.error('Response!', 'Something went wrong on server side!!');
			});
	}

	cancel_request(index: number, claim_unq_id: any, assessor_id: any) {
		this.apiService.cancel_claim_request(claim_unq_id, assessor_id).subscribe(
			data => {
				//	console.log("Response :" + JSON.stringify(data));
				if (data.error == false) {
					this.toastr.success('Response!', data.text);
					this.claimrequestList.splice(index, 1);
				}
				else {
					this.toastr.warning('Response!', data.text);
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
