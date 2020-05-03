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
    this.addSubscription(this.subscription, this.communicationService, this.router);
  }
  
  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  /**
   * Add Subsription in App Component and navigate to page returned by Communication Service.
   * 
   * @param subscription subscription object
   * @param communicationService communication service object 
   * @param router router that navigate to the page returned by communication service
   */
  private addSubscription(subscription: Subscription, communicationService: CommunicationService, router: Router): void {
    subscription.add(communicationService.getNavigateState().subscribe((pageName: String) => {
      router.navigate(['covidtracker/' + pageName]);
    }, errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  /**
   * Unsubscribe from the subscription 
   *  
   * @param subscription subscription object
   */
  private removeSubscription(subscription: Subscription): void {
     subscription.unsubscribe();
  }
}
