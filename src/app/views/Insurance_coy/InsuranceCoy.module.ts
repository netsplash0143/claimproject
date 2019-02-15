import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatStepperModule, MatInputModule, MatButtonModule } from '@angular/material';
import { InsuranceCoyRoutingModule } from './InsuranceCoy.routing';
import { InsuranceCoyComponent } from './InsuranceCoy.component';
import { ActiveListComponent } from './ActiveList.component';
import { HistoryListComponent } from './HistoryList.component';
import { ClaimInfoComponent } from './ClaimInfo.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    ModalModule,
    BsDropdownModule,
    InsuranceCoyRoutingModule,
    ButtonsModule.forRoot(),
    CommonModule,
    TabsModule,
    DataTablesModule,
    AmazingTimePickerModule,
    AngularDateTimePickerModule,
    GooglePlaceModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [InsuranceCoyComponent,ActiveListComponent,HistoryListComponent,ClaimInfoComponent ]
})
export class InsuranceCoyModule { }
