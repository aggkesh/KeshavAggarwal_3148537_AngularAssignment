import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorDetail } from '../model/errordetail';

fdescribe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let h1Element: HTMLElement;
  let h2Element: HTMLElement;
  let pElement: HTMLElement;
  let buttonElement: HTMLElement;
  let fakeActivatedRoute = {
    snapshot: {
      params: {
        'errorcode': '404'
      }
    }
  };
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ErrorComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
  
    let h1DebugElement: DebugElement = fixture.debugElement.query(By.css("h1"));
    let h2DebugElement: DebugElement = fixture.debugElement.query(By.css("h2"));
    let pDebugElement: DebugElement = fixture.debugElement.query(By.css("p"));
    let buttonDebugElement: DebugElement = fixture.debugElement.query(By.css("button"));

    h1Element = h1DebugElement.nativeElement;
    h2Element = h2DebugElement.nativeElement;
    pElement = pDebugElement.nativeElement;
    buttonElement = buttonDebugElement.nativeElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should check error correctly populated on UI', () => {
    expect(h1Element.textContent).toContain(component.errorDetail.statuscode);
    expect(h2Element.textContent).toContain(component.errorDetail.title);
    expect(pElement.textContent).toContain(component.errorDetail.description);
    expect(buttonElement.textContent).toContain('Home');
  });

  it('should return correctly error based on error code',  () => {
    var errorDetail = new ErrorDetail();
    errorDetail.statuscode = "404";
    errorDetail.title = "PAGE NOT FOUND.";
    errorDetail.description = "We Couldn't Find This Page"

    let errorcode = "404";
    expect(component.getErrorModel(errorcode)).toEqual(errorDetail);

    errorDetail.statuscode = "500";
    errorDetail.title = "Internal Server Error.";
    errorDetail.description = "Problem Reaching Out Server Please Try Again Later"

    errorcode = "500";
    expect(component.getErrorModel(errorcode)).toEqual(errorDetail);

    errorDetail.statuscode = "401";
    errorDetail.title = "Unauthorized.";
    errorDetail.description = "Not Authorized To Access page"

    errorcode = "401";
    expect(component.getErrorModel(errorcode)).toEqual(errorDetail);

    errorDetail.statuscode = "500";
    errorDetail.title = "Internal Server Error.";
    errorDetail.description = "Http Failure Could Not Reach Web Page"

    errorcode = "0";
    expect(component.getErrorModel(errorcode)).toEqual(errorDetail);

    errorDetail.statuscode = "404";
    errorDetail.title = "PAGE NOT FOUND.";
    errorDetail.description = "We Couldn't Find This Page"

    errorcode = "300";
    expect(component.getErrorModel(errorcode)).toEqual(errorDetail);

  });

});
