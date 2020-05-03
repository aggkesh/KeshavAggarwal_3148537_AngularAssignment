import { Component, OnInit, OnDestroy } from '@angular/core';
import { CovidStatService } from '../api/covid-stat-service/covid-stat.service';
import { CovidStateDetail } from '../model/covidstatedetail';
import { CovidDistrictDetail } from '../model/coviddistrictdetail';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  covidStateDetailList: CovidStateDetail[] = []

  constructor(private covidStatService: CovidStatService, 
              private communicationService: CommunicationService,
              private router: Router) {}

  ngOnInit() {
    this.addSubscription(this.subscription, this.covidStatService, this.router);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);        
  }

  _getCovidDistrictWiseData(stateName: string) {
    this.communicationService.updateNavigationState('statedetail/' + stateName)
  }

  private addSubscription(subscription: Subscription, covidStatService: CovidStatService, router: Router): void {
    subscription.add(this.covidStatService.getCovidStateWiseData().subscribe((covidStateDetailList: CovidStateDetail[]) => {
      this.covidStateDetailList = covidStateDetailList;
    },errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe(); 
  }

}