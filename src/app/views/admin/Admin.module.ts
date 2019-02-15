import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminRoutingModule } from './Admin.routing';
import { ActiveListComponent } from './ActiveList.component';
import { CreateClaimComponent } from './CreateClaim.component';
import { AdminComponent } from './Admin.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';
import { HistoryListComponent } from './HistoryList.component';
import { ClaimInfoComponent } from './ClaimInfo.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AddInsuranceCoyComponent } from './AddInsuranceCoy.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { RegisterAssessorComponent } from './RegisterAssessor.component';
import { RegisterGarageComponent } from './RegisterGarage.component';
import { MatStepperModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    ModalModule,
    BsDropdownModule,
    AdminRoutingModule,
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
  declarations: [AdminComponent,ActiveListComponent,CreateClaimComponent, HistoryListComponent,ClaimInfoComponent,AddInsuranceCoyComponent,RegisterAssessorComponent,RegisterGarageComponent ]
})
export class AdminModule { }
