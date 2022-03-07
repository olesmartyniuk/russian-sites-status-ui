import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { SiteDetails } from 'src/app/models/site';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import * as moment from 'moment';

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
  public displayedColumns: string[] = ['region', 'status', 'lastTestedAt'];

  private interval: any;
  private siteId: string;

  constructor(
    public visual: VisualService,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');

    await this.updateSiteInfo();
    this.startTimer();
  }

  ngOnDestroy() {
    this.pauseTimer();
  }

  public back = () => {
    this.location.back();
  }

  public getReadableTime = (lastDate) => {
    var minDate = moment.utc('0001-01-01');

    if (moment.utc(lastDate).isAfter(minDate)) {
      return moment(lastDate).fromNow();
    }

    return '-';
  }

  private startTimer() {
    this.interval = setInterval(async () => {
      await this.updateSiteInfo();
    }, this.checkStatusesIntervalInMs)
  }

  private pauseTimer() {
    clearInterval(this.interval);
  }

  private async updateSiteInfo() {
    try {
      this.site = await this.apiService.siteDetails(this.siteId);
    }
    catch (error) {
      console.error(error);
      this.pauseTimer();
      this.error = error.message;
      this.isError = true;
    }
  }
}
