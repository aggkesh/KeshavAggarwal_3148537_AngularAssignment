import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})  
export class NavbarComponent implements OnInit,OnDestroy {
    private subscription: Subscription = new Subscription();
    loggedIn: Boolean;
    title = 'Covid Tracking App';

    constructor(private communicationService: CommunicationService){}

    ngOnInit() : void {
        var loggedState = localStorage.getItem('LoggedInAsAdmin');
        this.loggedIn = loggedState != null && loggedState == "true";

        this.addSubscription(this.subscription, this.communicationService);
    }

    ngOnDestroy(): void {
        this.removeSubscription(this.subscription);
    }

    _loadPage(pageName: string) {
        this.communicationService.updateNavigationState(pageName);
    }

    _logout() {
        localStorage.removeItem('LoggedInAsAdmin');
        this.loggedIn = false;
    }

    private addSubscription(subscription: Subscription, communicationService: CommunicationService) {
        subscription.add(communicationService.getLoggedIn().subscribe((loggedInState : Boolean) => {
            this.loggedIn = loggedInState;
        }))
    }

    private removeSubscription(subscription: Subscription) {
         subscription.unsubscribe();
    }
}