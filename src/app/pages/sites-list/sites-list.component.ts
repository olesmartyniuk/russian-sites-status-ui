import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'rss-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit, OnDestroy {

  public sitesList: Site[] = [];
  public sitesNotFound: boolean = false;
  public displayedColumns: string[] = ['name', 'status', 'uptime'];

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    this.sitesList = await this.apiService.allSites();
  }

  ngOnDestroy() {
  }
}
