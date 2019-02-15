import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { ApiService } from '../api.service';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private ApiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('role') == 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (localStorage.getItem('role') == 'insurance-coy') {
      this.router.navigate(['/insurance-dashboard']);
    } else {
      return true;
    }
  }
}
