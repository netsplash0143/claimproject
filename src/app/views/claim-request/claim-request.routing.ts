import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ClaimRequestListComponent } from './claim-request.component';
import { ReportFormComponent } from './reportForm.component';
import { OldClaimComponent } from './oldClaim.component';
import { AuthGuard } from '../../middleware/auth.guard';
import { AssessorWorkComponent } from './AssessorWork.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path:'activeclaims',
    component: ClaimRequestListComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'New Claim Request'
    }
  },
  {
    path: 'activeclaims/reportform/:claim_unq_id',
    component: ReportFormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Claim Assement report form'
    }
  },
  {
    path: 'old-claim-list',
    canActivate: [AuthGuard],
    component: OldClaimComponent,
    data: {
      title: 'Claim Request History'
    }
  },
  {
    path: 'work-location',
    canActivate: [AuthGuard],
    component: AssessorWorkComponent,
    data: {
      title: 'Assessor Work Area'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Profile'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRequestListRoutingModule {}
