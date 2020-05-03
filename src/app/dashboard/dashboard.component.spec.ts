import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CovidStatService } from '../api/covid-stat-service/covid-stat.service';
import { of } from 'rxjs';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Router } from '@angular/router';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let service: CovidStatService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [ DashboardComponent ],
      providers: [CommunicationService,
        { provide: Router, useValue: router },
        { provide: CovidStatService, useValue: {
          getCovidStateWiseData: () => of([
            { active: "27259", confirmed: "39311", deaths: "1319", lastupdatedtime: "02/05/2020 22:22:45", recovered: "10729", state: "Total", statecode: "TT", districtData: null },
            { active: "272", confirmed: "311", deaths: "19", lastupdatedtime: "01/01/2020 21:21:15", recovered: "1079", state: "Maharashtra", statecode: "MH", districtData: null }
          ])
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CovidStatService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get state stat list from covid stat service via GET', () => {
    spyOn(service, 'getCovidStateWiseData')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getCovidStateWiseData).toHaveBeenCalledTimes(1);
    expect(component.covidStateDetailList).toEqual([
      { active: "27259", confirmed: "39311", deaths: "1319", lastupdatedtime: "02/05/2020 22:22:45", recovered: "10729", state: "Total", statecode: "TT", districtData: null },
      { active: "272", confirmed: "311", deaths: "19", lastupdatedtime: "01/01/2020 21:21:15", recovered: "1079", state: "Maharashtra", statecode: "MH", districtData: null }
    ]);
  });

});