import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { SiteDetails } from 'src/app/models/site';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { switchMap } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";
import { Subscription } from 'rxjs';

@Component({
  selector: 'rss-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent implements OnInit, OnDestroy {

  readonly checkStatusesIntervalInMs = 30000;

  public site: SiteDetails;
  public isError: boolean = false;
  public error: string = null;
  public displayedColumns: string[] = ['description', 'region', 'status'];

  private getSiteDetailsSubscription: Subscription;

  constructor(
    public visual: VisualService,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    const siteId = this.route.snapshot.paramMap.get('siteId');

    const getSites$ = timer(0, this.checkStatusesIntervalInMs)
      .pipe(switchMap(_ => this.apiService.siteDetails(siteId)));

    this.getSiteDetailsSubscription = getSites$.subscribe(
      (result: SiteDetails) => {
        this.site = result;
      },
      (error) => {
        console.error(error);
        this.getSiteDetailsSubscription.unsubscribe();
        this.error = error.message;
        this.isError = true;
      });
  }

  ngOnDestroy() {
    this.getSiteDetailsSubscription.unsubscribe();
  }

  public back = () => {
    this.location.back();
  }


}
