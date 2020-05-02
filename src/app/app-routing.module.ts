import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LatestNewsComponent } from './latestnews/latestnews.component';
import { PrecautionsComponent } from './precautions/precautions.component';
import { HomeComponent } from './home/home.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CovidDetailedStateStatComponent } from './covid-detailed-state-stat/covid-detailed-state-stat.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'covidtracker/dashboard', pathMatch: 'full'
  },
  {
    path: 'covidtracker', redirectTo: 'covidtracker/dashboard', pathMatch: 'full'
  },
  {
    path: 'covidtracker', component: HomeComponent , children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'latestnews', component: LatestNewsComponent
      },
      {
        path: 'precautions', component: PrecautionsComponent
      }
    ]
  },
  {
    path: 'covidtracker/login', component: SignInComponent
  },
  {
    path: 'covidtracker/addnews', component: AddNewsComponent
  },
  {
    path: 'covidtracker/newsdetail/:newsid', component: NewsDetailComponent
  },
  {
    path: 'covidtracker/statedetail/:statename', component: CovidDetailedStateStatComponent
  },
  {
    path: 'error/:errorcode', component: ErrorComponent
  },
  {
    path: '**', redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
