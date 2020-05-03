import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailComponent } from './news-detail.component';
import { NewsService } from '../api/news-service/news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../api/communication-service/communication.service';
import { of } from 'rxjs';

fdescribe('NewsDetailComponent', () => {
  let component: NewsDetailComponent;
  let fixture: ComponentFixture<NewsDetailComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let service: NewsService;
  let fakeActivatedRoute = {
    snapshot: {
      params: {
        'newsid': '1'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [ NewsDetailComponent ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute },
        { provide: NewsService, useValue: {
          getNews: () => of({id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" })
        }},
        CommunicationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NewsService);
    fixture.detectChanges();

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
    localStorage.removeItem['LoggedInAsAdmin'];
  });

  it('should create and initiaze the property correctly', () => {
    localStorage.setItem('LoggedInAsAdmin', "true")

    component.ngOnInit()

    expect(component.newsid).toBe("1");
    expect(component.loggedInAdmin).toBeTrue();
    expect(component).toBeTruthy();
  });

  it('should return correct value for the loggedIn State of admin', () => {
    expect(component.getLoggedInState()).toBeFalse();

    localStorage.setItem('LoggeAsAdmin', "true")
    expect(component.getLoggedInState()).toBeFalse();

    localStorage.setItem('LoggedInAsAdmin', "true")
    expect(component.getLoggedInState()).toBeTrue();
  });

  it('should populate the news detail on calling news service via GET', () => {
    spyOn(service, 'getNews')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getNews).toHaveBeenCalledWith("1");
    expect(component.news).toEqual({id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" })
  });

});
