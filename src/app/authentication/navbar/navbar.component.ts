import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  show: Boolean = true

  constructor(private router: Router) {
    router.events.subscribe((event) => (event instanceof NavigationEnd) && this.handleRouteChange())
  }

  handleRouteChange() {
    if (this.router.url.includes('login')) {
      this.show = true
    }
    else {
      this.show = false
    }
  };

  ngOnInit(): void {
  }

}
