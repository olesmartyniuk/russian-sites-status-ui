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

  public sitesList: Site[] = [];
  public sitesNotFound: boolean = false;
  public displayedColumns: string[] = ['name', 'status', 'uptime'];

  constructor(
    public visual: VisualService,    
    private apiService: ApiService, 
    private router: Router,) { }

  async ngOnInit() {
    this.sitesList = await this.apiService.allSites();
  }

  ngOnDestroy() {
  }

  public selectItem(row: Site) {
    this.router.navigate(['/site', row.id]);
    console.log('row', row);
  }
}
