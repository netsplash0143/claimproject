import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'ReviewOffer.component.html'
})
export class ReviewOfferComponent implements OnInit {
  validations_form: FormGroup;
  user_id: any;
  errflag: boolean = false;
  response: any = '';
  response1: any = '';
  errflag1: boolean = false;
  garage_offer_id: any;
  paramSubscription: Subscription;
  claimdata: any;
  Url: SafeUrl;
  additional_services = ['delivery', 'spare vehicle', 'towing', 'other'];
  selected_additional_service_value=[];

  constructor(public router: Router,
    private activeroute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('Review Offer component initialized');
    this.user_id = localStorage.getItem('user_id');
    this.paramSubscription = this.activeroute.paramMap.subscribe(params => {
      this.garage_offer_id = params.get("garage_offer_id");
      console.log('garage_offer_id:' + this.garage_offer_id);
    });
    const controls = this.additional_services.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to true (checked)

    this.validations_form = new FormGroup({
      additional_services: this.addservicecontrol(),
      garage_charge: new FormControl('', Validators.required),
      parts_amount: new FormControl('', Validators.required)
    });

    this.apiService.get_complete_claim_offer(this.garage_offer_id).subscribe(
      data => {
        console.log("Response :" + JSON.stringify(data));
        if (data.error == false) {
          this.errflag1 = false;
          this.claimdata = data.result;
          //this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(data.result.assessor_report_info.reportfile);

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

  addservicecontrol() {
    const arr = this.additional_services.map(element => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
  get serviceArray(){
    return <FormArray>this.validations_form.get('additional_services');
  }

  get_selected_additional_service_value(){
    this.selected_additional_service_value=[];
    this.serviceArray.controls.forEach((control,i)=>{
      if(control.value){
        this.selected_additional_service_value.push(this.additional_services[i]);
      }
    });
    //console.log(this.selected_additional_service_value);
  }
  submit() {
   // console.log(this.validations_form.value);
    let form_data = {
      claim_unq_id:this.claimdata.claim_unq_id,
      garage_offer_id : this.garage_offer_id,
      garage_charge:this.validations_form.value.garage_charge,
      parts_amount:this.validations_form.value.parts_amount,
      additional_services:this.selected_additional_service_value
    };

    //console.log('form data:'+JSON.stringify(form_data));
    
       this.apiService.update_garage_offer_info(form_data).subscribe(
       data => {
         console.log("Response :"+data.text);
         if(data.error==false)
         {
           this.errflag=false;
           this.response=data.text;
           setTimeout(() => {
            this.router.navigate(['/garage/new-offer-list']);
           }, 2000);
           
         }
         else{
           this.errflag=true;
           this.response=data.error;
         }
        
       },
       error => {
         console.log("Error :"+JSON.stringify(error));
         this.errflag=true;
         this.response=error;
       });
    
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }

}
