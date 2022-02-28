import { Component, OnInit, Input } from '@angular/core';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'rss-sites-list-item',
  templateUrl: './sites-list-item.component.html',
  styleUrls: ['./sites-list-item.component.css']
})
export class SitesListItemComponent implements OnInit {

  @Input() site: Site;

  constructor() {
  }

  ngOnInit() {
  }

}
