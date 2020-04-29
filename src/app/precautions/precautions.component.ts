import { Component, OnInit, OnDestroy } from '@angular/core';
import { Precaution } from '../model/precaution';
import { PrecautionService } from '../api/precaution-service/precaution.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-precautions',
  templateUrl: './precautions.component.html',
  styleUrls: ['./precautions.component.css']
})
export class PrecautionsComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();  
  precautionList: Precaution[] = [];

  constructor(private precautionService: PrecautionService) {}

  ngOnInit(): void {
    this.addSubscription(this.subscription, this.precautionService);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  private addSubscription(subscription: Subscription, precautionService: PrecautionService): void {
    subscription.add(precautionService.getAllPrecautions().subscribe((precautionList : Precaution[]) => {
      this.precautionList = precautionList;
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe();
  }

}