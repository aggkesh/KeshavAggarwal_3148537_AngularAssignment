import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from 'src/app/model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  SERVER_URL: string = "http://localhost:4200/api/news";
  
  constructor(private httpClient: HttpClient) { }

  public getAllNews() { 
       return this.httpClient.get(this.SERVER_URL);      
  }

  public getNews(newsId : String) {
       return this.httpClient.get(`${this.SERVER_URL}/${newsId}`); 
  }
  
  public createNews(news : News) {
      return this.httpClient.post(`${this.SERVER_URL}`, news)
  }

  public deleteNews(newsId : String) {
      return this.httpClient.delete(`${this.SERVER_URL}/${newsId}`)
  }

  public updatePolicy(news : News) {
      return this.httpClient.put(`${this.SERVER_URL}/${news.id}`, news)
  }

}
