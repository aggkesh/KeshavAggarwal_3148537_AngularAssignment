import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecautionsComponent } from './precautions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { PrecautionService } from '../api/precaution-service/precaution.service';
import { of } from 'rxjs';

fdescribe('PrecautionsComponent', () => {
  let component: PrecautionsComponent;
  let fixture: ComponentFixture<PrecautionsComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let service: PrecautionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [ PrecautionsComponent ],
      providers: [
        { provide: Router, useValue: router },
        { provide: PrecautionService, useValue: {
          getAllPrecautions: () => of([{ id: "1",  description: "Avoid close contact with people who are sick. Maintain at least three feet distance between yourself and anyone who is coughing or sneezing."},
          { id: "2",  description: "Avoid touching your eyes, nose, and mouth."}])}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecautionsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PrecautionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get precautions list from precaution service via GET', () => {
    spyOn(service, 'getAllPrecautions')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getAllPrecautions).toHaveBeenCalledTimes(1);
    expect(component.precautionList).toEqual([{ id: "1",  description: "Avoid close contact with people who are sick. Maintain at least three feet distance between yourself and anyone who is coughing or sneezing."},
    { id: "2",  description: "Avoid touching your eyes, nose, and mouth."}]);
  });

});