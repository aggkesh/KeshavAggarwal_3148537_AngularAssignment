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
    loggedInState: Boolean;
    title = 'Covid Tracking App';

    constructor(private communicationService: CommunicationService){}

    ngOnInit() : void {
        this.loggedInState = this.getLoggedInState();
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
        this.communicationService.updateLoggedInState(false);
    }

    private getLoggedInState() {
        var loggedState = localStorage.getItem('LoggedInAsAdmin');
        return loggedState != null && loggedState == "true";
    }

    private addSubscription(subscription: Subscription, communicationService: CommunicationService) {
        subscription.add(communicationService.getLoggedIn().subscribe((loggedInState : Boolean) => {
            this.loggedInState = loggedInState;
        }))
    }

    private removeSubscription(subscription: Subscription) {
         subscription.unsubscribe();
    }
}