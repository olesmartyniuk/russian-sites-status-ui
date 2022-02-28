import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VisualService } from 'src/app/services/visual.service';
import { SiteDetails } from 'src/app/models/site';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'rss-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent implements OnInit, OnDestroy {

  public site: SiteDetails;
  public displayedColumns: string[] = ['description', 'region', 'status'];

  constructor(
    public visual: VisualService,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    const siteId = this.route.snapshot.paramMap.get('siteId');
    this.site = await this.apiService.siteDetails(siteId);
  }

  ngOnDestroy() {
  }

  public back = () => {
    this.location.back();
  }


}
