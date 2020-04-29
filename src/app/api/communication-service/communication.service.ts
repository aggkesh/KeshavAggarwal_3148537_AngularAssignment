import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private loggedInState = new Subject<Boolean>();
  private navigationState = new Subject<String>();

  constructor() { }

  public getLoggedIn() {
    return this.loggedInState;
  }

  public getNavigateState() {
    return this.navigationState;
  }

  public updateLoggedInState(loggedInState: Boolean) {
    this.loggedInState.next(loggedInState);
  }

  public updateNavigationState(navigationPage: String) {
    this.navigationState.next(navigationPage);
  }
}
