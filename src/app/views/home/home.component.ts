import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {
	isLogin: boolean = false;

	constructor(public router: Router){}

	ngOnInit() {
		/** Session Check **/
	    let user_id = localStorage.getItem('user_id');
	    console.log("user_id :"+user_id);
	    if(user_id != null){
	      console.log("Logged In !");
	      this.isLogin = true;
	    }
	}

	redirect_login(){
		this.router.navigate(['/login']);
	}

	logout(){
		this.isLogin = false;
	    this.router.navigate(['/login']);
	    localStorage.removeItem('user_id');
	}
}
