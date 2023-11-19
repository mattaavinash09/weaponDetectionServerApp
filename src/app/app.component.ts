import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  showDivHeader = false;
  constructor(private router: Router
    ,private accountService: AccountService){}
  title = 'weapon-detection-server-app';
  ngOnInit(): void {
    // Subscribe to route parameter changes
    // Get the current route snapshot

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Handle the URL change
        const currentUrl = event.url;
        this.showDivHeader =  !currentUrl.includes('account');

      
        // You can perform actions based on the new URL here
        // For example, update component state, fetch data, etc.
      }
    });
}
logout(){
  this.accountService.logout();
  this.router.navigate(['/account/login']);
}
}
