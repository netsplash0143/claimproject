import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarageProfileComponent } from './GarageProfile.component';
import { GarageNewOfferListComponent } from './GarageNewOfferList.component';
import { GarageOldOfferListComponent } from './GarageOldOfferList.component';
import { ReviewOfferComponent } from './ReviewOffer.component';
import { JobDetailsComponent } from './JobDetails.component';
import { AuthGuard } from '../../middleware/auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: GarageProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'new-offer-list',
    canActivate: [AuthGuard],
    component: GarageNewOfferListComponent,
    data: {
      title: 'New Claim Offers'
    }
  },
  {
    path: 'new-offer-list/review-offer/:garage_offer_id',
    component: ReviewOfferComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Review Claim Offer'
    }
  },
  {
    path: 'old-offer-list',
    canActivate: [AuthGuard],
    component: GarageOldOfferListComponent,
    data: {
      title: 'Claim Offers History'
    }
  },
  {
    path: 'old-offer-list/job-details/:garage_offer_id',
    component: JobDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Job complete details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
