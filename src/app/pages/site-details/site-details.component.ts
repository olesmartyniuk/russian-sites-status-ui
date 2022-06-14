import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { SiteDetails } from 'src/app/models/site';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import * as moment from 'moment';
import { StatisticVm as Statistic } from 'src/app/models/statistic';

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

  chartData: any[];
  view: any[] = [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  animations: boolean = true;
  showDataLabel: boolean = false;

  colorScheme = {
    domain: ['#E30000', '#008000', '#717171']
  };

  statistics: Statistic;

  onSelect(event) {
    console.log(event);
  }

  constructor(
    public visual: VisualService,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');

    await this.updateSiteInfo();
    await this.updateStatistics(null);

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

  public async periodClick(url: string) {
    await this.updateStatistics(url);
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

  private async updateStatistics(url: string) {
    if (url === null) {
      this.statistics = await this.apiService.siteStatisticsDefault(this.siteId);
    } else {
      this.statistics = await this.apiService.siteStatistics(url);
    }
    console.log(this.statistics);

    this.chartData = this.statistics.data
      .map(item => ({
        name: item.label,
        series: [
          {
            name: 'down',
            value: item.down
          },
          {
            name: 'up',
            value: item.up
          },
          {
            name: 'unknown',
            value: item.unknown
          }
        ]
      }));
    console.log(this.chartData);
  }

}