import { TestBed } from '@angular/core/testing';
import { PrecautionService } from './precaution.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Precaution } from 'src/app/model/precaution';

fdescribe('PrecautionService', () => {
  let service: PrecautionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrecautionService]
    });
    service = TestBed.get(PrecautionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrive precautions from API via GET', () => {
    let dummyPrecautions: Array<Precaution> = [
      { id: "1",  description: "Avoid close contact with people who are sick. Maintain at least three feet distance between yourself and anyone who is coughing or sneezing."},
      { id: "2",  description: "Avoid touching your eyes, nose, and mouth."}
    ];

    service.getAllPrecautions().subscribe((precautions: Array<Precaution>) => {
      expect(precautions.length).toBe(2);
      expect(precautions).toBe(dummyPrecautions);
    });

    const request = httpMock.expectOne(service.SERVER_URL);

    expect(request.request.method).toBe('GET');
    
    request.flush(dummyPrecautions);
  });

});
