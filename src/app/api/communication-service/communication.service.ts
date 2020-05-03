import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CovidStateDetail } from 'src/app/model/covidstatedetail';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private loggedInState = new Subject<Boolean>();
  private navigationState = new Subject<String>();

  constructor() { }

  /**
   * Get the loggedIn State of the user
   * 
   * @returns true if the user is loggedIn false otherwise
   */
  public getLoggedIn() {
    return this.loggedInState;
  }

  /**
   * Get the navigation page name where you want to move
   * 
   * @returns page name where you want to move
   */
  public getNavigateState() {
    return this.navigationState;
  }

  /**
   * Update the loggedIn the state for all other subscriber
   * 
   * @param loggedInState loggedIn state of the user
   */
  public updateLoggedInState(loggedInState: Boolean) {
    this.loggedInState.next(loggedInState);
  }

  /**
   * Update the pageName so that subscriber registered 
   * can make him move to current page with given page name
   * 
   * @param navigationPage pagename where you want to move
   */
  public updateNavigationState(navigationPage: String) {
    this.navigationState.next(navigationPage);
  }
}
