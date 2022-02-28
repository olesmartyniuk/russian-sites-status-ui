import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site, SiteDetails } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://russian-sites-status-api.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  public async allSites(): Promise<Site[]> {
    return this.http
      .get<Site[]>(this.baseUrl + 'status')
      .toPromise();
  }

  public async siteDetails(siteId: string): Promise<SiteDetails>{
    return this.http
      .get<SiteDetails>(this.baseUrl + 'status/' + siteId)
      .toPromise();
  }
}
