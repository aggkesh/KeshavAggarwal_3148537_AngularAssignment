import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { News } from 'src/app/model/news';

fdescribe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.get(DataService);
  });

  it('should create Db using the function create db', () => {

    let news =  [
      {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1" }
    ];

     let users = [
        { username: 'Admin', email: 'keshav.aggarwal@nagarro.com', password: 'Keshav1' }
     ];

     let precautions = [
      { id: 1,  description: 'Avoid close contact with people who are sick. Maintain at least three feet distance between yourself and anyone who is coughing or sneezing.'},
      { id: 2,  description: 'Avoid touching your eyes, nose, and mouth.'},
      { id: 3,  description: 'Stay home when you are sick.'},
      { id: 4,  description: 'Cover your cough or sneeze with a tissue, then dispose of the tissue safely.'},
      { id: 5,  description: 'Clean and disinfect frequently-touched objects and surfaces using a regular household cleaning spray or wipe.'},
      { id: 6,  description: 'Wearing a mask is not necessary unless you are taking care of an infected person. The Centers for Disease Control (CDC) does recommend that only infected people wear masks to prevent the spread of the virus.'},
      { id: 7,  description: 'Wash your hands often with soap and water for at least 20 seconds, especially after going to the bathroom, before eating, and after blowing your nose, coughing, or sneezing.'},
      { id: 8,  description: 'If soap and water are not readily available, use an alcohol-based hand sanitiser with at least 60% alcohol. Always wash hands with soap and water when hands are visibly dirty.'},
      { id: 9,  description: 'If you have a fever, cough and difficulty breathing, seek medical attention immediately.'},
      { id: 10, description: 'Keep in mind the travel advisory set out by the Ministry of Health and Welfare.'}
   ];

    expect(service.createDb()).toEqual({news, users, precautions});
  });

  it('should get Correct News Id using the function genId', () => {
    let news: News[] = [{
      id: 1,
      title: "title1",
      description: "description1",
      summary: "summary1",
      image: "image1"     
    },
    {
      id: 2,
      title: "title2",
      description: "description2",
      summary: "summary2",
      image: "image2"     
    }]

    expect(service.genId(news)).toEqual(3);

    news = []

    expect(service.genId(news)).toEqual(1);
  });

});
