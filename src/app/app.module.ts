import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SitesListComponent } from './pages/sites-list/sites-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppInitService } from './services/app-init.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SiteDetailsComponent } from './pages/site-details/site-details.component';
import { SitesListItemComponent } from './pages/sites-list-item/sites-list-item.component';

export function appInit(appInitService: AppInitService) {
  return () => appInitService.Init();
}

const appRoutes: Routes = [
  { path: '', redirectTo: 'sites', pathMatch: 'full' },
  { path: 'sites', component: SitesListComponent },  
  { path: 'site/:siteId', component: SiteDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SitesListComponent,
    SitesListItemComponent,
    NotFoundComponent,
    SiteDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,    
    HttpClientModule,
    RouterModule.forRoot(appRoutes),        
    NgbModule,
    HttpClientModule,    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppInitService]
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }