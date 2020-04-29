import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDetailedStateStatComponent } from './covid-detailed-state-stat.component';

describe('CovidDetailedStateStatComponent', () => {
  let component: CovidDetailedStateStatComponent;
  let fixture: ComponentFixture<CovidDetailedStateStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDetailedStateStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDetailedStateStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
