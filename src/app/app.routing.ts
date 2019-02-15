import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ConfirmRegisterComponent } from './views/confirm_register/confirm_register.component';
import { ForgetPasswordComponent } from './views/forget_password/forget_password.component';
import { NewOuterClaimComponent } from './views/new_claim/new_claim.component';
import { GetClaimComponent } from './views/get_claim/get_claim.component';
import { ConfirmRegisterGarageComponent } from './views/confirm_register/confirm_register_garage.component';
import { AdminLoginComponent } from './views/admin/AdminLogin.component';
import { AdminForgetPasswordComponent } from './views/forget_password/admin_forget_password.component';
import { AuthGuard } from './middleware/auth.guard';
import { AdminAuthGuard } from './middleware/admin.guard';
import { RoleGuard } from './middleware/role.guard';
import { InsuranceCoyLoginComponent } from './views/Insurance_coy/InsuranceCoyLogin.component';
import { InsuranceCoyAuthGuard } from './middleware/InsuranceCoy.guard';
import { RegisterGarageComponent } from './views/register-garage/register-garage.component';
import { RegisterAssessorComponent } from './views/register-assessor/register-assessor.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register-assessor',
    component: RegisterAssessorComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'register-garage',
    component: RegisterGarageComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'new_claim',
    component: NewOuterClaimComponent,
    data: {
      title: 'New Claim Page'
    }
  },
  {
    path: 'get_claim',
    component: GetClaimComponent,
    data: {
      title: 'Get Claim Page'
    }
  },
  {
    path: 'get_claim/:claim_unique_id',
    component: GetClaimComponent,
    data: {
      title: 'Get Claim Page'
    }
  },
  {
    path: 'confirm_register',
    component: ConfirmRegisterComponent,
    data: {
      title: 'Confirm Register Page'
    }
  },
  {
    path: 'confirm_register_garage',
    component: ConfirmRegisterGarageComponent,
    data: {
      title: 'Confirm Register'
    }
  },
  {
    path: 'forget_password',
    component: ForgetPasswordComponent,
    data: {
      title: 'Forget Password'
    }
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
    data: {
      title: 'Admin Login'
    }
  },
  {
    path: 'admin_forget_password',
    component: AdminForgetPasswordComponent,
    data: {
      title: 'Forget Password'
    }
  },
  {
    path: 'insurance-coy',
    component: InsuranceCoyLoginComponent,
    data: {
      title: 'Insurance Company Login'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        canActivate:[AuthGuard,RoleGuard],
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'admin-dashboard',
        canActivate:[AdminAuthGuard],
        loadChildren: './views/admin/Admin.module#AdminModule'
      },
      {
        path: 'insurance-dashboard',
        canActivate:[InsuranceCoyAuthGuard],
        loadChildren: './views/Insurance_coy/InsuranceCoy.module#InsuranceCoyModule'
      },
      {
        path: 'assessor',
        canActivate:[AuthGuard],
        loadChildren: './views/claim-request/claim-request.module#ClaimRequestListModule'
      },
      {
        path: 'claims',
        loadChildren: './views/claims/claims.module#ClaimsModule'
      },
      {
        path: 'change_password',
        loadChildren: './views/change-password/changePassword.module#changePasswordModule'
      },
      {
        path: 'garage',
        canActivate:[AuthGuard],
        loadChildren: './views/Garage/Garage.module#GarageModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  {
    path: '**',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', // Add options right here
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
