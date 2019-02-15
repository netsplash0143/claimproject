import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app.component.html'
  // template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    /** Session Check **/
    let user_id = localStorage.getItem('user_id');
    if (user_id != null) {
      console.log("Logged In !");
      if (localStorage.getItem('role') == 'admin') {
        this.router.navigate(['/admin-dashboard']);
      }
      else {
        this.router.navigate(['/dashboard']);
      }
    }

  }
}
