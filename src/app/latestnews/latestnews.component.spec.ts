import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LatestNewsComponent } from './latestnews.component';
import { NewsService } from '../api/news-service/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommunicationService } from '../api/communication-service/communication.service';

fdescribe('LatestNewsComponent', () => {
  let component: LatestNewsComponent;
  let fixture: ComponentFixture<LatestNewsComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let service: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [ LatestNewsComponent ],
      providers: [ CommunicationService,
        { provide: Router, useValue: router },
        { provide: NewsService, useValue: {
          getAllNews: () => of([
            {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" },
            {  id:  2, title: 'News2', description: 'News 2', summary: "Summary 2", image: "image2" }
          ])
        }}]
       })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NewsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get latest news list from news service via GET', () => {
    spyOn(service, 'getAllNews')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getAllNews).toHaveBeenCalledTimes(1);
    expect(component.newsList).toEqual([
      {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" },
      {  id:  2, title: 'News2', description: 'News 2', summary: "Summary 2", image: "image2" }
    ]);
  });

});