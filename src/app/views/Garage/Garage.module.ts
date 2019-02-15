import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GarageRoutingModule } from './Garage.routing';
import { GarageProfileComponent } from './GarageProfile.component';
import { GarageNewOfferListComponent } from './GarageNewOfferList.component';
import { GarageOldOfferListComponent } from './GarageOldOfferList.component';
import { ReviewOfferComponent } from './ReviewOffer.component';
import { JobDetailsComponent } from './JobDetails.component';
import { DataTablesModule } from 'angular-datatables';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    ModalModule,
    BsDropdownModule,
    GarageRoutingModule,
    ButtonsModule.forRoot(),
    CommonModule,
    DataTablesModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBc90ew0JkksSnoaSmokYLDSjm90A4OUBw'
    }),
  ],
  declarations: [GarageProfileComponent,GarageNewOfferListComponent,GarageOldOfferListComponent,ReviewOfferComponent,JobDetailsComponent ]
})
export class GarageModule { }
