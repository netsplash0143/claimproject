import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { changePasswordComponent } from './changePassword.component';
import { changePasswordRoutingModule } from './changePassword.routing';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    changePasswordRoutingModule,
    ButtonsModule.forRoot(),
    CommonModule
  ],
  declarations: [changePasswordComponent ]
})
export class changePasswordModule { }
