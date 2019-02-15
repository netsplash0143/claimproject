import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  templateUrl: 'AssessorWork.component.html'
})
export class AssessorWorkComponent implements OnInit {
  currentlat: any;
  currentlng: any;
  zoom: number = 13;
  user_id:any;
  radius:any;
  cDraggable:boolean=false;
  assessorinfo:any;

  constructor(private apiService:ApiService,
    public router: Router){}

  ngOnInit(){
    this.user_id = localStorage.getItem('user_id');
    console.log('user_id:'+this.user_id);
        this.apiService.get_assessor_info(this.user_id).subscribe(
          data => {
          
            if(data.error == false){
              this.assessorinfo=data.result;
              this.currentlat = parseFloat(data.result.latitude);
              this.currentlng = parseFloat(data.result.longitude);
              this.radius=parseFloat(data.result.radius)*1609.34; //meter
              console.log(this.radius);
              
            }
          },
          error => {
            console.log("Error :"+JSON.stringify(error));
          });
   
  }

}
