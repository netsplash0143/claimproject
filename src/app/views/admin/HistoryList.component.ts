import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'HistoryList.component.html'
})
export class HistoryListComponent implements OnDestroy, OnInit {

  oldclaims: any=[];
  user_id: any;
  role: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  constructor(private apiService: ApiService,private toastr: ToastrService, public router: Router, public formBuilder: FormBuilder) {
   }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  
      this.apiService.admin_oldclaim_list().subscribe(data=>{
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.oldclaims = data.result;
          this.dtTrigger.next();
        }
        else {
          this.toastr.warning('Response!', data.text);
        }
      },error=>{
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      })
    
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
 


}
