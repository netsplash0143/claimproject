import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceCoyAuthGuard } from '../../middleware/InsuranceCoy.guard';
import { InsuranceCoyComponent } from './InsuranceCoy.component';
import { ClaimInfoComponent } from './ClaimInfo.component';
import { HistoryListComponent } from './HistoryList.component';
import { ActiveListComponent } from './ActiveList.component';

const routes: Routes = [
    {
      path:'',
      component: InsuranceCoyComponent,
      data: {
        title: 'Insurance Company'
      },
    },
    {
      path: 'active-list',
      canActivate: [InsuranceCoyAuthGuard],
      component: ActiveListComponent,
      data: {
        title: 'Active Claim List'
      },
    },
    {
      path: 'active-list/claim-info/:claimid',
      component:ClaimInfoComponent,
      canActivate: [InsuranceCoyAuthGuard],
      data: {
        title: 'Claim Details'
      }
    },
    {
      path: 'history-list',
      component:HistoryListComponent,
      canActivate: [InsuranceCoyAuthGuard],
      data: {
        title: 'Old Claim list'
      }
    },
    {
      path: 'history-list/claim-info/:claimid',
      component:ClaimInfoComponent,
      canActivate: [InsuranceCoyAuthGuard],
      data: {
        title: 'Claim Complete Details'
      }
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCoyRoutingModule { }
