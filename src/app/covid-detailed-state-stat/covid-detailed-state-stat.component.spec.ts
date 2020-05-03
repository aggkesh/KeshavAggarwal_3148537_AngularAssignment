import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovidDetailedStateStatComponent } from './covid-detailed-state-stat.component';
import { CovidStatService } from '../api/covid-stat-service/covid-stat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CovidStateDetail } from '../model/covidstatedetail';

fdescribe('CovidDetailedStateStatComponent', () => {
  let component: CovidDetailedStateStatComponent;
  let fixture: ComponentFixture<CovidDetailedStateStatComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let service: CovidStatService;
  let fakeActivatedRoute = {
    snapshot: {
      params: {
        'statename': 'Maharashtra'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDetailedStateStatComponent ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute },
        { provide: CovidStatService, useValue: {
          getCovidStateWiseData: () => of([
            { active: "27259", confirmed: "39311", deaths: "1319", lastupdatedtime: "02/05/2020 22:22:45", recovered: "10729", state: "Total", statecode: "TT", districtData: null },
            { active: "272", confirmed: "311", deaths: "19", lastupdatedtime: "01/01/2020 21:21:15", recovered: "1079", state: "Maharashtra", statecode: "MH", districtData: null }
          ]),
          getCovidDistrictWiseData: () => of({ 
            active: "272", 
            confirmed: "311", 
            deaths: "19", 
            lastupdatedtime: "01/01/2020 21:21:15", 
            recovered: "1079",
            state: "Maharashtra", 
            statecode: "MH", 
            districtData: [{
                active: "0",
                confirmed: "1",
                deceased: "0",
                recovered: "1",
                district: "Bongaigaon",
                statecode: "TT"
              }
            ]
          })
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDetailedStateStatComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CovidStatService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();

    expect(component.stateName).toBe("Maharashtra");
    expect(component).toBeTruthy();
  });

  it('should get state & district stat list from covid stat service via GET', () => {
    spyOn(service, 'getCovidStateWiseData')
    .and
    .callThrough();
    spyOn(service, 'getCovidDistrictWiseData')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getCovidStateWiseData).toHaveBeenCalledTimes(1)
    expect(service.getCovidDistrictWiseData).toHaveBeenCalledTimes(1);
    expect(component.covidStateDetail).toEqual({ 
      active: "272", 
      confirmed: "311", 
      deaths: "19", 
      lastupdatedtime: "01/01/2020 21:21:15", 
      recovered: "1079",
      state: "Maharashtra", 
      statecode: "MH", 
      districtData: [{
          active: "0",
          confirmed: "1",
          deceased: "0",
          recovered: "1",
          district: "Bongaigaon",
          statecode: "TT"
        }
      ]
    });
  });

  it('should return statedetail matchichg given state name', () => {
    var stateDetailList: Array<CovidStateDetail> = [
      { active: "27259", confirmed: "39311", deaths: "1319", lastupdatedtime: "02/05/2020 22:22:45", recovered: "10729", state: "Total", statecode: "TT", districtData: null },
      { active: "272", confirmed: "311", deaths: "19", lastupdatedtime: "01/01/2020 21:21:15", recovered: "1079", state: "Maharashtra", statecode: "MH", districtData: null },
      { active: "3896", confirmed: "5054", deaths: "262", lastupdatedtime: "02/05/2020 21:23:45", recovered: "896", state: "Gujarat", statecode: "GJ", districtData: null }
    ]

    expect(component.findCovidStateDetail(stateDetailList, "Maharashtra")).toBe(stateDetailList[1]);
    expect(component.findCovidStateDetail(stateDetailList, "Gujarat")).toBe(stateDetailList[2]);
    expect(component.findCovidStateDetail(stateDetailList, "Delhi")).toBe(null);
  });

});
