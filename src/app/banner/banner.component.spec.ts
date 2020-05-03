import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1Element: HTMLElement;
  let pElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    let h1DebugElement: DebugElement = fixture.debugElement.query(By.css("h1"));
    let pDebugElement: DebugElement = fixture.debugElement.query(By.css("p"));

    h1Element = h1DebugElement.nativeElement;
    pElement = pDebugElement.nativeElement;
  });

  it('should create banner with correct value of h1 and p', () => {
    expect(h1Element.textContent).toContain("Covid Tracker");
    expect(pElement.textContent).toContain("A Place To Fight Against Covid-19.");
  });

});
