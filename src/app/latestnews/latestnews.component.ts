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

  ngOnInit() {
    this.addSubscription(this.subscription, this.communicationService, this.newsService, this.router);
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  _more(newsId: String): void {
    this.communicationService.updateNavigationState('newsdetail/' + newsId)
  }

  private addSubscription(subscription: Subscription, communicationService: CommunicationService, 
                          newsService: NewsService, router: Router): void {
    subscription.add(newsService.getAllNews().subscribe((newsList: Array<News>) => {
      this.newsList = newsList;
    }, errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe();
  }

}