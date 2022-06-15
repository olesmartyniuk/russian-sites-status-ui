import { Component, Input, OnInit } from '@angular/core';
import { StatisticVm as Statistic } from 'src/app/models/statistic';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-site-statistic',
  templateUrl: './site-statistic.component.html',
  styleUrls: ['./site-statistic.component.css']
})
export class SiteStatisticComponent implements OnInit {

  @Input() siteId: string = null; 

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

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.updateStatistics(null);
  }

  public async periodClick(url: string) {
    await this.updateStatistics(url);
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
