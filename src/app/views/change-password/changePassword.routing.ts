import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { changePasswordComponent } from './changePassword.component';
import { AuthGuard } from '../../middleware/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: changePasswordComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Change Password'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class changePasswordRoutingModule {}
