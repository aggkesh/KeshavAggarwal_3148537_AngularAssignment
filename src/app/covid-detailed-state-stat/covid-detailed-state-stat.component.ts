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

  /**
   * Add subscription to the component
   * 
   * @param subscription subscription
   * @param covidStatService covidStatService object
   * @param stateName state name for which district detail need to find out
   * @param router router 
   */
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

  /**
   * Remove subscription from component
   * 
   * @param subscription subscription
   */
  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe(); 
  }

  /**
   * Method find the covid stats for the state with given state name
   * 
   * @param covidStateDetailList covid State list containing details about covid stat for states
   * @param stateName state name for which we need covid stats from the method
   * @returns covid state detail if we have state with given state name in the list, null otherwise
   */
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
