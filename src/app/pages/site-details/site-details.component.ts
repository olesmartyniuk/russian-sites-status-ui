import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SiteDetails } from 'src/app/models/site';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rss-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent implements OnInit, OnDestroy {

  public site: SiteDetails;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  async ngOnInit() {
    const siteId = this.route.snapshot.paramMap.get('siteId');
    this.site = await this.apiService.siteDetails(siteId);
  }

  ngOnDestroy() {
  }
}
