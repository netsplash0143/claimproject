import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { ApiService } from '../api.service';


@Injectable()
export class InsuranceCoyAuthGuard implements CanActivate {
  constructor(private ApiService: ApiService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.ApiService.isAuth()==true && localStorage.getItem('role')=='insurance-coy') {
      console.log('Insurance Company guard:'+this.ApiService.isAuth());
      return true;
    } else {
      this.router.navigate(['/home']);
    }
  }
}
