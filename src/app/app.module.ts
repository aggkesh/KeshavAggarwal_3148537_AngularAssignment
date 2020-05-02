import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrecautionsComponent } from './precautions/precautions.component';
import { LatestNewsComponent } from './latestnews/latestnews.component';
import { HomeComponent } from './home/home.component';
import { AddNewsComponent } from './add-news/add-news.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './api/data-service/data.service';
import { NewsService } from './api/news-service/news.service';
import { BannerComponent } from './banner/banner.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserService } from './api/user-service/user.service';
import { CommunicationService } from './api/communication-service/communication.service';
import { CovidDetailedStateStatComponent } from './covid-detailed-state-stat/covid-detailed-state-stat.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LatestNewsComponent,
    PrecautionsComponent,
    HomeComponent,
    AddNewsComponent,
    BannerComponent,
    NewsDetailComponent,
    SignInComponent,
    CovidDetailedStateStatComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(DataService, {passThruUnknownUrl: true}),
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [NewsService, UserService, CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
