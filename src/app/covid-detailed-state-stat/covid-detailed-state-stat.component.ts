import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidStatService } from '../api/covid-stat-service/covid-stat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidStateDetail } from '../model/covidstatedetail';

@Component({
  selector: 'app-covid-detailed-state-stat',
  templateUrl: './covid-detailed-state-stat.component.html',
  styleUrls: ['./covid-detailed-state-stat.component.css']
})
export class CovidDetailedStateStatComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  covidStateDetail: CovidStateDetail;
  stateName: string;

  constructor(private activatedroute: ActivatedRoute
            , private covidStatService: CovidStatService
            , private router: Router) {
    this.stateName = this.activatedroute.snapshot.params.statename;
  }

  ngOnInit(): void {
    this.addSubscription(this.subscription, this.covidStatService, this.stateName, this.router);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  private addSubscription(subscription: Subscription, covidStatService: CovidStatService, 
                          stateName: string, router: Router): void {
    subscription.add(this.covidStatService.getCovidStateWiseData().subscribe((covidStateDetailList: Array<CovidStateDetail>) => {

      var stateDetail = this.findCovidStateDetail(covidStateDetailList, stateName);

      if(stateDetail != null) {
        subscription.add(this.covidStatService.getCovidDistrictWiseData(stateDetail)
                    .subscribe((covidStateAndDistrictDetail: CovidStateDetail) => {
          this.covidStateDetail = covidStateAndDistrictDetail;
        }, errors => {
          router.navigate(['error/'+errors.status]);          
        }));
      } else {
        router.navigate(['error/404']);        
      }     
    }, errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe(); 
  }

  findCovidStateDetail(covidStateDetailList: Array<CovidStateDetail>, 
                                stateName: string): CovidStateDetail {
    for(var index = 0;index < covidStateDetailList.length; index++) {
      if(covidStateDetailList[index].state == stateName) {
        return covidStateDetailList[index];
      }

    }
    return null;
  }
}
