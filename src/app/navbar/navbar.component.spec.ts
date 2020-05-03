import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommunicationService } from '../api/communication-service/communication.service';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: CommunicationService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: Router, useValue: router },
        CommunicationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(CommunicationService);

    // Mock localStorage
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string): string => {
     return store[key] || null;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });

  });

  afterEach(() => {
    localStorage.removeItem['LoggedInAsAdmin']
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct value for the loggedIn State of admin', () => {
    expect(component.getLoggedInState()).toBeFalse();

    localStorage.setItem('LoggeAsAdmin', "true")
    expect(component.getLoggedInState()).toBeFalse();

    localStorage.setItem('LoggedInAsAdmin', "true")
    expect(component.getLoggedInState()).toBeTrue();
  });

  it('should return loggedOut State when admin logout', () => {
    //first the user is logged in
    localStorage.setItem('LoggedInAsAdmin', "true")
    expect(component.getLoggedInState()).toBeTrue();

    service.getLoggedIn().subscribe((loggedInState) => {
      //logout state circualted through the communication service
      expect(loggedInState).toBeFalse();
    });

    //after the logout
    component._logout();

    //local storage to be empty
    expect(component.getLoggedInState()).toBeFalse();
  });

  it('should load correct page for the pagname',() => {

    service.getNavigateState().subscribe((navigateState) => {
      expect(navigateState).toBe('login');      
    });

    component._loadPage('login');
  });

});