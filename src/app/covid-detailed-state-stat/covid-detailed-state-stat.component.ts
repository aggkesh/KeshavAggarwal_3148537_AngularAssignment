import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidStatService } from '../api/covid-stat-service/covid-stat.service';
import { ActivatedRoute } from '@angular/router';
import { CovidStateDetail } from '../model/covidstatedetail';
import { CovidDistrictDetail } from '../model/coviddistrictdetail';

@Component({
  selector: 'app-covid-detailed-state-stat',
  templateUrl: './covid-detailed-state-stat.component.html',
  styleUrls: ['./covid-detailed-state-stat.component.css']
})
export class CovidDetailedStateStatComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  covidStateDetail: CovidStateDetail;
  private stateName: string;

  constructor(private activatedroute: ActivatedRoute
            , private covidStatService: CovidStatService) {
    this.stateName = this.activatedroute.snapshot.params.statename;
  }

  ngOnInit(): void {
    this.addSubscription(this.subscription, this.covidStatService, this.stateName);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  private addSubscription(subscription: Subscription, covidStatService: CovidStatService, stateName: string): void {
    subscription.add(this.covidStatService.getCovidStateWiseData().subscribe((covidStateDetailList: CovidStateDetail[]) => {
      covidStateDetailList.forEach(covidStateDetail => {
        if(covidStateDetail.state == this.stateName) {
          subscription.add(this.covidStatService.getCovidDistrictWiseData(covidStateDetail).
          subscribe((covidStateAndDistrictDetail: CovidStateDetail) => {
            this.covidStateDetail = covidStateAndDistrictDetail;
          }));
        }        
      });
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe(); 
  }

}
