import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { ClaimsComponent } from './claims.component';
import { NewClaimComponent } from './newclaim.component';
import { ViewClaimComponent } from './viewclaim.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Claims'
    },
    children: [
      {
        path: 'claimslist',
        component: ClaimsComponent
      },
      {
        path: 'newClaim',
        component: NewClaimComponent
      }
      ,
      {
        path: 'viewClaim',
        component: ViewClaimComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule {}
