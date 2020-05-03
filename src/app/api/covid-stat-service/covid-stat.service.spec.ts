import { TestBed } from '@angular/core/testing';
import { CovidStatService } from './covid-stat.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CovidStateDetail } from 'src/app/model/covidstatedetail';

fdescribe('CovidStatService', () => {
  let service: CovidStatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CovidStatService]
    });
    service = TestBed.get(CovidStatService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrive CovidStateDetails from the API via GET', () => {
    let dummyCovidStateDetails: Array<CovidStateDetail> = [
      { active: "27259", confirmed: "39311", deaths: "1319", lastupdatedtime: "02/05/2020 22:22:45", recovered: "10729", state: "Total", statecode: "TT", districtData: null },
      { active: "272", confirmed: "311", deaths: "19", lastupdatedtime: "01/01/2020 21:21:15", recovered: "1079", state: "Maharashtra", statecode: "MH", districtData: null }
    ]

    service.getCovidStateWiseData().subscribe((covidStateDetails: Array<CovidStateDetail>) => {
      expect(covidStateDetails.length).toBe(2);
      expect(covidStateDetails).toBe(dummyCovidStateDetails);
    });

    const request = httpMock.expectOne(service.SERVER_STATE_URL);

    expect(request.request.method).toBe('GET');
    
    request.flush({"statewise": dummyCovidStateDetails});
  });

  it('should retrive CovidDistrictWiseDetail from the API via GET', () => {
    let inputCovidStateDetail: CovidStateDetail = { 
        active: "27259", 
        confirmed: "39311", 
        deaths: "1319", 
        lastupdatedtime: "02/05/2020 22:22:45", 
        recovered: "10729", 
        state: "Total", 
        statecode: "TT", 
        districtData: null
    };

    let dummyCovidStateDetail: CovidStateDetail = { 
        active: "27259", 
        confirmed: "39311", 
        deaths: "1319", 
        lastupdatedtime: "02/05/2020 22:22:45", 
        recovered: "10729", 
        state: "Total", 
        statecode: "TT", 
        districtData: [{
            active: "0",
            confirmed: "1",
            deceased: "0",
            recovered: "1",
            district: "Bongaigaon",
            statecode: "TT"
          }
        ]
    };

    service.getCovidDistrictWiseData(dummyCovidStateDetail).subscribe((covidStateDetail: CovidStateDetail) => {
      expect(covidStateDetail).toBe(dummyCovidStateDetail);
    });

    const request = httpMock.expectOne(service.SERVER_DISTRICT_URL);

    expect(request.request.method).toBe('GET');
    
    request.flush(dummyCovidStateDetail);
  });

});
