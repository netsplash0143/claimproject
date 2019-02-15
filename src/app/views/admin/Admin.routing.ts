import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveListComponent } from './ActiveList.component';
import { CreateClaimComponent } from './CreateClaim.component';
import { HistoryListComponent } from './HistoryList.component';
import { ClaimInfoComponent } from './ClaimInfo.component';
import { AdminComponent } from './Admin.component';
import { AddInsuranceCoyComponent } from './AddInsuranceCoy.component';
import { AdminAuthGuard } from '../../middleware/admin.guard';
import { RegisterAssessorComponent } from './RegisterAssessor.component';
import { RegisterGarageComponent } from './RegisterGarage.component';
const routes: Routes = [
    {
      path:'',
      component: AdminComponent,
      data: {
        title: 'Admin-dashboard'
      },
    },
    {
      path: 'active-list',
      canActivate: [AdminAuthGuard],
      component: ActiveListComponent,
      data: {
        title: 'Active Claim List'
      },
    },
    {
      path: 'active-list/claim-info/:claimid',
      component:ClaimInfoComponent,
      canActivate: [AdminAuthGuard],
      data: {
        title: 'Claim Details'
      }
    },
    {
      path: 'new-claim',
      component:CreateClaimComponent,
      canActivate: [AdminAuthGuard],
      data: {
        title: 'New Claim'
      }
    },
    {
      path: 'history-list',
      component:HistoryListComponent,
      canActivate: [AdminAuthGuard],
      data: {
        title: 'Old Claim list'
      }
    },
    {
      path: 'history-list/claim-info/:claimid',
      component:ClaimInfoComponent,
      canActivate: [AdminAuthGuard],
      data: {
        title: 'Claim Complete Details'
      }
    },
    {
      path:'insurance-coy',
      component:AddInsuranceCoyComponent,
      canActivate:[AdminAuthGuard],
      data: {
        title: 'Insurance Company'
      }
    },
    {
      path:'assessors',
      component:RegisterAssessorComponent,
      canActivate:[AdminAuthGuard],
      data: {
        title: 'Assessor'
      }
    },
    {
      path:'garage',
      component:RegisterGarageComponent,
      canActivate:[AdminAuthGuard],
      data: {
        title: 'All Garage'
      }
    }



  /*  children: [
      {
        path: 'active-list',
        canActivate: [AuthGuard],
        component: ActiveListComponent,
        data: {
          title: 'Active Claim List'
        },
      },
      {
        path: 'active-list/claim-info/:claimid',
        component:ClaimInfoComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Claim Details'
        }
      },
      {
        path: 'new-claim',
        component:CreateClaimComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'New Claim'
        }
      },
      {
        path: 'history-list',
        component:HistoryListComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Old Claim list'
        }
      },
      {
        path: 'history-list/claim-info/:claimid',
        component:ClaimInfoComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Claim Complete Details'
        }
      }] */
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
