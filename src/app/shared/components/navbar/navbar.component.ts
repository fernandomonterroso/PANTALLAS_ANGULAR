import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
  currentRoute: string;
  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    router.events.subscribe((val) => {
      if (this.router.url !== this.currentRoute) {
        this.currentRoute = this.router.url;
      }
    });
  }

  public option = 0;

  ngOnInit(): void {
  }
  collapsed = true;
    toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
     }
}
