import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'ActiveList.component.html'
})
export class ActiveListComponent implements OnDestroy, OnInit {

  activeclaims: any=[];
  user_id: any;
  role: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();
  
  constructor(private apiService: ApiService,private toastr: ToastrService, public router: Router, public formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    console.log(`ActiveListComponent initiated \n role:${this.role} \n user_id:${this.user_id}`);
  
    this.apiService.admin_active_list().subscribe(data=>{
      console.log("Response :" + JSON.stringify(data));
      if (data.error == false) {
        this.activeclaims = data.result;
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
    this.dtTrigger.unsubscribe();
  }
 


}
