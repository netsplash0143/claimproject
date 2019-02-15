import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClaimsComponent } from './claims.component';
import { NewClaimComponent } from './newclaim.component';
import { ViewClaimComponent } from './viewclaim.component';
import { ClaimsRoutingModule } from './claims-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ClaimsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    TabsModule
  ],
  declarations: [ 
  	ClaimsComponent,
  	NewClaimComponent ,
    ViewClaimComponent
  ]
})
export class ClaimsModule {}
