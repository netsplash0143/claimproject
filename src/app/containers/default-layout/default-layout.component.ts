import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { assessornavItems,garagenavItems,adminnavItems,insurancenavItems } from './../../_nav';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = assessornavItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public widthobserver: MutationObserver;
  avatar:any;
  role:any;
  subscription: Subscription;

  constructor(public router: Router,private apiService: ApiService) {
    this.avatar=localStorage.getItem('avatar');
    this.role=localStorage.getItem('role');
    if(localStorage.getItem('role')=='garage')
    {
      this.navItems=garagenavItems;
    }
    else if(localStorage.getItem('role')=='admin'){
      this.navItems=adminnavItems;
    }
    else if(localStorage.getItem('role')=='insurance-coy'){
      this.navItems=insurancenavItems;
    }
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.subscription = this.apiService.getchangelogo().subscribe(message => { console.log(message);this.avatar = message.logo; });

  }
  public ngOnInit()
  {
       $(document).ready(function(){
         $('.my_custom_toggle_btn').on('click',function(){
            if($('.sidebar-fixed .sidebar').css('width')=="0px"){
                $(".sidebar-fixed .sidebar").css('width',"200px");
                $(".sidebar-lg-show.sidebar-fixed .app-footer").css('margin-right',"200px");
                $('html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .main, html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .app-footer').css('margin-right','200px');
              
            } else {
               
                $(".sidebar-fixed .sidebar").css('width',"0px");
                $(".sidebar-lg-show.sidebar-fixed .app-footer").css('margin-right',"0px");
                $('html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .main, html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .app-footer').css('margin-right','0px');
             }
          });
          $(window).resize(function(){
                if ($(window).width() < 576 )
                {
                  $(".sidebar-fixed .sidebar").css('width',"0px");
                  $(".sidebar-lg-show.sidebar-fixed .app-footer").css('margin-right',"0px");
                  $('html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .main, html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .app-footer').css('margin-right','0px');
                }
                else
                {
                  $(".sidebar-fixed .sidebar").css('width',"200px");
                  $(".sidebar-lg-show.sidebar-fixed .app-footer").css('margin-right',"200px");
                  $('html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .main, html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .app-footer').css('margin-right','200px');
                }
            });
    });
  }

  // edit_profile() {
  //   this.router.navigate(['/profile']);
  // }

  change_password(){
    this.router.navigate(['/change_password']);
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('avatar');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
}
