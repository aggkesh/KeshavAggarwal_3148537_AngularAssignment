import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from './api/communication-service/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  
  constructor(private router: Router,private communicationService: CommunicationService) {}

  ngOnInit() : void {
    this.addSubscription(this.subscription, this.communicationService);
  }
  
  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  private addSubscription(subscription: Subscription, communicationService: CommunicationService): void {
    subscription.add(communicationService.getNavigateState().subscribe((pageName: String) => {
      this.router.navigate(['covidtracker/' + pageName]);
    }));
  }

  private removeSubscription(subscription: Subscription): void {
     subscription.unsubscribe();
  }
}
