import { Component, OnInit, OnDestroy } from '@angular/core';
import { Precaution } from '../model/precaution';
import { PrecautionService } from '../api/precaution-service/precaution.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precautions',
  templateUrl: './precautions.component.html',
  styleUrls: ['./precautions.component.css']
})
export class PrecautionsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();  
  precautionList: Array<Precaution>;

  constructor(private precautionService: PrecautionService,
              private router: Router) {}

  ngOnInit(): void {
    this.addSubscription(this.subscription, this.precautionService, this.router);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  /**
   * Add subscription to component
   * 
   * @param subscription Subscription 
   * @param precautionService PrecuationService
   * @param router Router
   */
  private addSubscription(subscription: Subscription, precautionService: PrecautionService, router: Router): void {
    subscription.add(precautionService.getAllPrecautions().subscribe((precautionList : Array<Precaution>) => {
      this.precautionList = precautionList;
    }, errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  /**
   * Remove subscription from component
   * 
   * @param subscription Subscription 
   */
  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe();
  }

}