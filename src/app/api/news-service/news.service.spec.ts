import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { News } from 'src/app/model/news';

fdescribe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    service = TestBed.get(NewsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrive all news from API via GET', () => {
    let dummyNewsList: Array<News> = [
      {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" },
      {  id:  2, title: 'News2', description: 'News 2', summary: "Summary 2", image: "image2" }
    ];

    service.getAllNews().subscribe((news: Array<News>) => {
      expect(news.length).toBe(2);
      expect(news).toBe(dummyNewsList);
    });

    const request = httpMock.expectOne(service.SERVER_URL);

    expect(request.request.method).toBe('GET');
    
    request.flush(dummyNewsList);
  });

  it('should retrive news from API via GET', () => {
    let dummyNews: News = {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" };
    let newsid = "1";

    service.getNews(newsid).subscribe((news: News) => {
      expect(news).toBe(dummyNews);
    });
    
    const request = httpMock.expectOne(`${service.SERVER_URL}/${newsid}`);

    expect(request.request.method).toBe('GET');
    
    request.flush(dummyNews);
  });

  it('should create news from API via POST', () => {
    let news: News = {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" };
    let dummyNews: News = {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" };
    
    service.createNews(news).subscribe((news: News) => {
      expect(news).toBe(dummyNews);
    });
    
    const request = httpMock.expectOne(service.SERVER_URL);

    expect(request.request.method).toBe('POST');
    
    request.flush(dummyNews);
  });

  it('should delete news from API via DELETE', () => {
    let dummyNews: News = {  id:  1, title: 'News1', description: 'News 1', summary: "Summary 1", image: "image1" };
    let newsid = "1";

    service.deleteNews(newsid).subscribe((news: News) => {
      expect(news).toBe(dummyNews);
    });
    
    const request = httpMock.expectOne(`${service.SERVER_URL}/${newsid}`);

    expect(request.request.method).toBe('DELETE');
    
    request.flush(dummyNews);
  });

});
