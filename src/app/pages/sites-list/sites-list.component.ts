import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { Site } from 'src/app/models/site';
import { Router } from '@angular/router';

@Component({
  selector: 'rss-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit, OnDestroy {

  readonly checkStatusesIntervalInMs = 30000;
  public searchText: string = "";
  public sitesList: Site[] = [];
  public isError: boolean = false;
  public error: string = null;
  public displayedColumns: string[] = ['name', 'status', 'uptime'];

  private interval: any;

  constructor(
    public visual: VisualService,
    private apiService: ApiService,
    private router: Router,) { }

  async ngOnInit() {
    await this.updateSites();
    this.startTimer();
  }

  ngOnDestroy() {
    this.pauseTimer();
  }

  public selectItem(row: Site) {
    this.router.navigate(['/site', row.id]);
    console.log('row', row);
  }

  private startTimer() {
    this.interval = setInterval(async () => {
      await this.updateSites();
    }, this.checkStatusesIntervalInMs)
  }

  private async updateSites() {
    try {
      this.sitesList = await this.apiService.allSites();
    }
    catch (error) {
      console.error(error);
      this.pauseTimer();
      this.error = error.message;
      this.isError = true;
    }
  }

  private pauseTimer() {
    clearInterval(this.interval);
  }
}
