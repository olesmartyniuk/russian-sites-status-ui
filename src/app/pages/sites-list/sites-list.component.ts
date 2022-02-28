import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { Site } from 'src/app/models/site';
import { Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";
import { Subscription } from 'rxjs';

@Component({
  selector: 'rss-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit, OnDestroy {

  readonly checkStatusesIntervalInMs = 30000;

  public sitesList: Site[] = [];
  public sitesNotFound: boolean = false;
  public displayedColumns: string[] = ['name', 'status', 'uptime'];
  
  private getSitesSubscription: Subscription;

  constructor(
    public visual: VisualService,    
    private apiService: ApiService, 
    private router: Router,) { }

  async ngOnInit() {   
    const getSites$ = timer(0, this.checkStatusesIntervalInMs)
      .pipe(switchMap(_ => this.apiService.allSites()));

      this.getSitesSubscription = getSites$.subscribe(
        (result: Site[]) => {
          this.sitesList = result;
        });
  }

  ngOnDestroy() {
    this.getSitesSubscription.unsubscribe();
  }

  public selectItem(row: Site) {
    this.router.navigate(['/site', row.id]);
    console.log('row', row);
  }
}
