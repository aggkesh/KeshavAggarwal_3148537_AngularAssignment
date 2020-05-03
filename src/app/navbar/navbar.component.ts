import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})  
export class NavbarComponent implements OnInit,OnDestroy {
    private subscription: Subscription = new Subscription();
    loggedInState: Boolean;
    title = 'Covid Tracking App';

    constructor(private communicationService: CommunicationService,
                private router: Router){}

    ngOnInit() : void {
        this.loggedInState = this.getLoggedInState();
        this.addSubscription(this.subscription, this.communicationService, this.router);
    }

    ngOnDestroy(): void {
        this.removeSubscription(this.subscription);
    }

    /**
     * Method load the page with given page name.
     * 
     * @param pageName page name to loaded 
     */
    _loadPage(pageName: string) {
        this.communicationService.updateNavigationState(pageName);
    }

    /**
     * Called when the user press logout method clean out the local
     * storage for the logged in state of the user and make him logged out.
     */
    _logout(): void {
        localStorage.removeItem('LoggedInAsAdmin');
        this.communicationService.updateLoggedInState(false);
    }

    /**
     * Get whether the person is loggedIn or not based on local storage value
     * 
     * @returns true of the person is logged in false otherwise.
     */
    getLoggedInState() {
        var loggedState = localStorage.getItem('LoggedInAsAdmin');
        return loggedState != null && loggedState == "true";
    }

    private addSubscription(subscription: Subscription, communicationService: CommunicationService, 
                            router: Router) {
        subscription.add(communicationService.getLoggedIn().subscribe((loggedInState : Boolean) => {
            this.loggedInState = loggedInState;
        }, errors => {
            router.navigate(['error/'+errors.status]);
        }))
    }

    private removeSubscription(subscription: Subscription) {
         subscription.unsubscribe();
    }
}