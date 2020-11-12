import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'News Hub by Alan Dugdall';
  currentPage: string;

  constructor(private router: Router, private swUpdate: SwUpdate) {  
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((navigationStart: NavigationStart) => {
      this.currentPage = navigationStart.url;
    })

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if(confirm("New version available. Load New Version?")) {
              window.location.reload();
          }
      });
    };
  }
}
