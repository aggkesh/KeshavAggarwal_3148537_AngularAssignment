import { TestBed } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

fdescribe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicationService]
    });
    service = TestBed.get(CommunicationService);
  });

  it('Get and Update loggedInState works correctly', () => {
    
    service.getLoggedIn().subscribe((loggedInState) => {
      expect(loggedInState).toBe(true);
    })

    service.updateLoggedInState(true);
  });

  it('Get and Update navigateState works correctly', () => {
    var navigateState: String = "navigate";

    service.getNavigateState().subscribe((navigateState) => {
      expect(navigateState).toBe(navigateState);      
    })

    service.updateNavigationState(navigateState);
  });

});
