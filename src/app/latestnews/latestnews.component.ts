import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../model/news';
import { NewsService } from '../api/news-service/news.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../api/communication-service/communication.service';


@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css']
})
export class LatestNewsComponent implements OnInit,OnDestroy {
  
  private subscription: Subscription = new Subscription();    
  newsList : News[] = [];

  constructor(private newsService: NewsService, 
              private communicationService: CommunicationService) {}

  ngOnInit() {
    this.addSubscription(this.subscription, this.communicationService, this.newsService);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  _more(newsId: String): void {
    this.communicationService.updateNavigationState('newsdetail/' + newsId)
  }

  private addSubscription(subscription: Subscription, communicationService: CommunicationService, 
                          newsService: NewsService): void {
    subscription.add(newsService.getAllNews().subscribe((newsList : News[]) => {
      this.newsList = newsList;
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe();
  }

}