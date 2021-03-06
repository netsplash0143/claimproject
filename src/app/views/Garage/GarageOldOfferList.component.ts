import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'GarageOldOfferList.component.html'
})
export class GarageOldOfferListComponent implements OnDestroy, OnInit {

  claimoffers: any;
  user_id: any;
  role: any;
  response1: any = '';
  errflag1: boolean = false;
  response2: any = '';
  errflag2: boolean = false;
  offerclass:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  constructor(private apiService: ApiService, public router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    console.log(`GarageOldOfferListComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.apiService.get_oldclaim_offer_list(this.user_id).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.errflag1 = false;
          this.claimoffers=data.result;
          this.dtTrigger.next();
        }
        else {
          this.errflag1 = true;
          this.response1 = data.text;
        }
      },
      error => {
        console.log("Error :" + JSON.stringify(error));
        this.errflag1 = true;
        this.response1 = error;
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
 


}
