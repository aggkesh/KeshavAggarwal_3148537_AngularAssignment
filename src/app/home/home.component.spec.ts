import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { By } from '@angular/platform-browser';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let bannerComponent: BannerComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ul: HTMLElement;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  const fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        returnUrl: '/'
      }
    }
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ HomeComponent, BannerComponent ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bannerComponent = TestBed.createComponent(BannerComponent).componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(bannerComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should navigate to correct page provided in _movePage', () => {

    component._moveToPage('login');
    expect(router.navigate).toHaveBeenCalledWith([ 'login' ], { relativeTo: fakeActivatedRoute });

    component._moveToPage('home');
    expect(router.navigate).toHaveBeenCalledWith([ 'home' ], { relativeTo: fakeActivatedRoute });
  });

  it('should ul correctly populated with li element', () => {
    ul = fixture.debugElement.query(By.css("ul")).nativeElement;
    expect(ul.childElementCount).toEqual(3);

    let liHtmlCollection :HTMLCollection = ul.children

    expect(liHtmlCollection.item(0).textContent).toEqual("Dashboard");
    expect(liHtmlCollection.item(1).textContent).toEqual("Latest News");
    expect(liHtmlCollection.item(2).textContent).toEqual("Precautions");
  });

});
