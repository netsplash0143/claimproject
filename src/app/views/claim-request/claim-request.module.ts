import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ClaimRequestListComponent } from './claim-request.component';
import { ClaimRequestListRoutingModule } from './claim-request.routing';
import { ReportFormComponent } from './reportForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OldClaimComponent } from './oldClaim.component';
import { AssessorWorkComponent } from './AssessorWork.component';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule } from '@agm/core';
import { ProfileComponent } from './profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    ClaimRequestListRoutingModule,
    ButtonsModule.forRoot(),
    CommonModule,
    DataTablesModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBc90ew0JkksSnoaSmokYLDSjm90A4OUBw'
    }),
    GooglePlaceModule
  ],
  declarations: [ClaimRequestListComponent,ReportFormComponent,OldClaimComponent,AssessorWorkComponent,ProfileComponent ]
})
export class ClaimRequestListModule { }
