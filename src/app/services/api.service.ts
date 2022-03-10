import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site, SiteDetails } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://dev-mss-api.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public async allSites(): Promise<Site[]> {
    return this.http
      .get<Site[]>(this.baseUrl + '/sites')
      .toPromise();
  }

  public async siteDetails(siteId: string): Promise<SiteDetails>{
    return this.http
      .get<SiteDetails>(this.baseUrl + '/sites/' + siteId)
      .toPromise();
  }
}
