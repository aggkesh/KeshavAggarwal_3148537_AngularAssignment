import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { CommunicationService } from './api/communication-service/communication.service';
import { NavbarComponent } from './navbar/navbar.component';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let navbarComponent: NavbarComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: CommunicationService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, NavbarComponent
      ],
      providers: [
        { provide: Router, useValue: router },
        CommunicationService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    navbarComponent = TestBed.createComponent(NavbarComponent).componentInstance;
    service = TestBed.get(CommunicationService);
  });

  it('should create the app', () => {
    expect(navbarComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should navigate to correct page returned by Communication Service', () => {
    component.ngOnInit();

    service.updateNavigationState('login')
    expect(router.navigate).toHaveBeenCalledWith(['covidtracker/login']);

    service.updateNavigationState('home')
    expect(router.navigate).toHaveBeenCalledWith(['covidtracker/home']);
  });

});
