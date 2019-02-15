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
  ins_id: any;
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
    this.ins_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    console.log(`ActiveListComponent initiated \n role:${this.role} \n user_id:${this.ins_id}`);
  
    this.apiService.InsCoy_active_list(this.ins_id).subscribe(data=>{
     
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
