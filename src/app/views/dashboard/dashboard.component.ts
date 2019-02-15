import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  isTracking = false;
  currentLat: any;
  currentLong: any;
  user_id: any;
  role: any;
  newclaimreqcount: number = 0;
  oldclaimreqcount: number = 0;
  newclaimofferscount: number = 0;
  oldclaimofferscount: number = 0;
  logo: any;
  avg_rating:any;
  selectedfile: any = '';
  btnname: any = 'Upload';
  validations_form: FormGroup;

  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');
    this.validations_form = new FormGroup({
      logofile: new FormControl('', Validators.required)
    });
   

    if (this.role == 'assessor') {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.showTrackingPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser,update your browser or use different browser!!");
      }
      this.apiService.get_claim_request_list(this.user_id).subscribe(
        data => {

          if (data.error == false) {
            this.newclaimreqcount = data.result.length;
          }
        },
        error => {
          console.log("Error :" + JSON.stringify(error));
        });
      this.apiService.get_old_claim_request_list(this.user_id).subscribe(
        data => {

          if (data.error == false) {
            this.oldclaimreqcount = data.result.length;
          }
        },
        error => {
          console.log("Error :" + JSON.stringify(error));
        });

      this.apiService.get_assessor_info(this.user_id).subscribe(
        data => {
          console.log("Response :" + JSON.stringify(data));
          if (data.error == false) {
            this.logo = data.result.image;
            this.avg_rating = data.result.avg_rating;
          }
        },
        error => {
          console.log("Error :" + JSON.stringify(error));
        });

        
    } else if (this.role == 'garage') {
      this.apiService.get_newclaim_offer_list(this.user_id).subscribe(
        data => {

          if (data.error == false) {
            this.newclaimofferscount = data.result.length;
          }
        },
        error => {
          console.log("Error :" + JSON.stringify(error));
        });
      this.apiService.get_oldclaim_offer_list(this.user_id).subscribe(
        data => {
          if (data.error == false) {
            this.oldclaimofferscount = data.result.length;
          }
        },
        error => {
          console.log("Error :" + JSON.stringify(error));
        });

        this.apiService.get_garage_info(this.user_id).subscribe(
          data => {
            console.log("Response :" + JSON.stringify(data));
            if (data.error == false) {
              this.logo = data.result.image;
              this.avg_rating = data.result.avg_rating;
            }
          },
          error => {
            console.log("Error :" + JSON.stringify(error));
          });
    }
  }

  onFileselected(e) {
    console.log(e.target.files[0]);
    this.selectedfile = <File>e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.logo = event.target.result;
      this.btnname = e.target.files[0].name;
    }

  }

  updatelogo() {
    console.log('update submit for user_id:' + this.user_id);
    let form_data = {
      user_id: this.user_id,
      role: this.role
    };
    this.apiService.update_avatar(this.selectedfile, form_data).subscribe(
      data => {
        if (data.result) {
          this.toastr.success('Response!', data.text);
          localStorage.setItem('avatar', data.result.image);
          this.btnname = 'Upload';

        }
        else {
          this.toastr.warning('Response!', data.text);
        }
      },
      error => {
        this.toastr.error('Response!', 'Something went wrong on server side!!');
      });
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
      console.log(this.role);
      // console.log('location found');
      // console.log(position);
      this.apiService.update_location_assessor(this.user_id,position.coords.latitude,position.coords.longitude).subscribe((res)=>{
        console.log('updation response');      
        console.log(res);
      },error=>{
        console.log('error in server'+error);
      })
  }

}
