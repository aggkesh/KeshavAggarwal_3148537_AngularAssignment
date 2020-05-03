import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from 'src/app/model/news';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  SERVER_URL: string = "http://localhost:4200/api/news";
  
  constructor(private httpClient: HttpClient) { }

  /**
   * Get All the News save in DB.
   * 
   * @returns all news present in db
   */
  public getAllNews(): Observable<Array<News>> { 
       return this.httpClient.get<Array<News>>(this.SERVER_URL);      
  }

  /**
   * Get the news with given news id in db.
   * 
   * @param newsId news id of the news to get from db.
   * @returns news with given news id
   */
  public getNews(newsId : String): Observable<News> {
       return this.httpClient.get<News>(`${this.SERVER_URL}/${newsId}`); 
  }
  
  /**
   * Save the given news in db
   * 
   * @param news news object to be saved in db
   * @returns news object that has been save in db.
   */
  public createNews(news : News): Observable<News> {
      return this.httpClient.post<News>(`${this.SERVER_URL}`, news)
  }

  /**
   * Delete the news in db for the given news id
   * 
   * @param newsId news id to be deleted
   * @returns news which is deleted for current id
   */
  public deleteNews(newsId : String): Observable<News> {
      return this.httpClient.delete<News>(`${this.SERVER_URL}/${newsId}`)
  }

}
