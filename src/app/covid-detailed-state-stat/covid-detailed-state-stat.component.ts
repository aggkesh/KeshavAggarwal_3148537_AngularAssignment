import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidStatService } from '../api/covid-stat-service/covid-stat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-covid-detailed-state-stat',
  templateUrl: './covid-detailed-state-stat.component.html',
  styleUrls: ['./covid-detailed-state-stat.component.css']
})
export class CovidDetailedStateStatComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  private stateName: String;

  constructor(private activatedroute: ActivatedRoute,private covidStatService: CovidStatService) {
    this.stateName = this.activatedroute.snapshot.params.stateName;
  }

  ngOnInit(): void {
    this.addSubscription(this.subscription, this.covidStatService);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  private addSubscription(subscription: Subscription, covidStatService: CovidStatService): void {
    subscription.add(this.covidStatService.getCovidStateWiseData().subscribe((covidStateDetailList: CovidStateDetail[]) => {
      this.covidStateDetailList = covidStateDetailList;
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe(); 
  }

}
