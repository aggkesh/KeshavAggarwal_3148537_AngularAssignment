import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../model/news';
import { NewsService } from '../api/news-service/news.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css']
})
export class LatestNewsComponent implements OnInit,OnDestroy {
  
  private subscription: Subscription = new Subscription();    
  newsList: Array<News>;

  constructor(private newsService: NewsService, 
              private communicationService: CommunicationService,
              private router: Router) {}

  ngOnInit(): void {
    this.addSubscription(this.subscription, this.communicationService, this.newsService, this.router);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  /**
   * Move the user to news detail screen and show news for the
   * given newsid
   * 
   * @param newsId newsId of news to show on next screen
   */
  _more(newsId: String): void {
    this.communicationService.updateNavigationState('newsdetail/' + newsId)
  }

  /**
   * Add subscription to component
   * 
   * @param subscription Subscription 
   * @param communicationService CommunicationService
   * @param newsService NewsService
   * @param router Router
   */
  private addSubscription(subscription: Subscription, communicationService: CommunicationService, 
                          newsService: NewsService, router: Router): void {
    subscription.add(newsService.getAllNews().subscribe((newsList: Array<News>) => {
      this.newsList = newsList;
    }, errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  /**
   * Remove subscription from component
   * 
   * @param subscription subscription 
   */
  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe();
  }

}