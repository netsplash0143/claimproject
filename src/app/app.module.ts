import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import Services
import { ApiService } from './api.service';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ConfirmRegisterComponent } from './views/confirm_register/confirm_register.component';
import { ForgetPasswordComponent } from './views/forget_password/forget_password.component';
import { NewOuterClaimComponent } from './views/new_claim/new_claim.component';
import { GetClaimComponent } from './views/get_claim/get_claim.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatStepperModule, MatInputModule, MatButtonModule,MatTabsModule } from '@angular/material';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ConfirmRegisterGarageComponent } from './views/confirm_register/confirm_register_garage.component';
import { AdminForgetPasswordComponent } from './views/forget_password/admin_forget_password.component';
import { StarRatingModule } from 'angular-star-rating';
import { AdminLoginComponent } from './views/admin/AdminLogin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AdminAuthGuard } from './middleware/admin.guard';
import { AuthGuard } from './middleware/auth.guard';
import { RoleGuard } from './middleware/role.guard';
import { ToastrModule } from 'ngx-toastr';
import { InsuranceCoyAuthGuard } from './middleware/InsuranceCoy.guard';
import { InsuranceCoyLoginComponent } from './views/Insurance_coy/InsuranceCoyLogin.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegisterAssessorComponent } from './views/register-assessor/register-assessor.component';
import { RegisterGarageComponent } from './views/register-garage/register-garage.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    ModalModule.forRoot(),
    ScrollToModule.forRoot(),
    StarRatingModule.forRoot(),
    GooglePlaceModule,
    NgxPaginationModule,
    AmazingTimePickerModule,
    AngularDateTimePickerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    NgxSpinnerModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    HomeComponent,
    RegisterAssessorComponent,
    RegisterGarageComponent,
    ConfirmRegisterComponent,
    ConfirmRegisterGarageComponent,
    ForgetPasswordComponent,
    AdminForgetPasswordComponent,
    NewOuterClaimComponent,
    GetClaimComponent,
    AdminLoginComponent,
    InsuranceCoyLoginComponent
  ],
  providers: [
    //   {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    AuthGuard,
    AdminAuthGuard,
    RoleGuard,
    InsuranceCoyAuthGuard,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
