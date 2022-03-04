import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { Site } from 'src/app/models/site';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  public statusFilter = 'No filter';
  public searchText = '';
  public statusFilterOptions = ['No filter', 'Only Up', 'Only Down'];

  private interval: any;

  constructor(
    public visual: VisualService,
    private apiService: ApiService,
    private router: Router) { }

  async ngOnInit() {
    await this.updateSites();
    
    this.startTimer();
    
    this.sitesList.filterPredicate = function (data, filter: string): boolean {      
      let fltr: Filter = JSON.parse(filter);            
      let filterByText = data.name.toString().toLowerCase().includes(fltr.searchText);
      let filterByStatus = data.status.toString().toLowerCase().includes(fltr.status);
      return filterByText && filterByStatus;
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

  public searchTextClear() {
    this.searchText = '';
    this.filterSitesList();
  }

  public filterSitesList() {

    let searchText = '';
    if (!this.searchText || this.searchText.length < 2)
      searchText = '';
    else
      searchText = this.searchText.trim().toLowerCase();

    let status = '';
    switch (this.statusFilter) {
      case 'No filter': status = ''; break;
      case 'Only Up': status = 'up'; break;
      case 'Only Down': status = 'down'; break;
    }  

    let filter: Filter = {
      status: status,
      searchText: searchText
    }

    this.sitesList.filter = JSON.stringify(filter);
    console.warn(this.sitesList.filter);
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
}

class Filter {
  public searchText: string;
  public status: string;
}
