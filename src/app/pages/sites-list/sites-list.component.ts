import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { Site } from 'src/app/models/site';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'rss-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit, OnDestroy {

  readonly checkStatusesIntervalInMs = 30000;
  public sitesList = new MatTableDataSource([] as Site[]);
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
    this.sitesList.filterPredicate = function(data, filter: string): boolean {
      return data.name.toString().toLowerCase().includes(filter);
    };
  }

  ngOnDestroy() {
    this.pauseTimer();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.sitesList.sort = this.sort;
  }

  public selectItem(row: Site) {
    this.router.navigate(['/site', row.id]);
  }

  private startTimer() {
    this.interval = setInterval(async () => {
      await this.updateSites();
    }, this.checkStatusesIntervalInMs)
  }

  private async updateSites() {
    try {
      this.sitesList.data = await this.apiService.allSites();
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

  applyFilter(filterValue: any) {
    let value = filterValue.target.value
    if(!value || value.length < 2)
      this.sitesList.filter = "";
    else
      this.sitesList.filter = filterValue.target.value.trim().toLowerCase();
  }
}
