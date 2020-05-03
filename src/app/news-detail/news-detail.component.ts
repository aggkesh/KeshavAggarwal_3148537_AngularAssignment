import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../model/news';
import { NewsService } from '../api/news-service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../api/communication-service/communication.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  news: News;
  loggedInAdmin: boolean;
  newsid: string;

  constructor(private newsService: NewsService, 
              private route: ActivatedRoute,
              private router: Router,
              private communicationService: CommunicationService) {
    this.newsid = this.route.snapshot.params.newsid;
  }

  ngOnInit(): void {
    this.loggedInAdmin = this.getLoggedInState();

    this.addSubscription(this.subscription, this.newsService, 
      this.communicationService, this.newsid, this.router)
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  /**
   * Delete the given news and take user to latest news screen
   */
  _deleteNews(): void {
    this.subscription.add(this.newsService.deleteNews(this.newsid).subscribe(() =>{
      this.router.navigate(['covidtracker/latestnews']);
    }));
  }

  /**
   * Get the logged in state for the user
   * 
   * @returns true if the user is loggedIn false otherwise
   */
  getLoggedInState(): boolean {
    var loggedState = localStorage.getItem('LoggedInAsAdmin');
    return loggedState != null && loggedState == "true";
  }

  /**
   * Add subscription to component
   * 
   * @param subscription Subscription
   * @param newsService NewsService
   * @param communicationService CommunicationService
   * @param newsid newsid for which we need news detail
   * @param router Router
   */
  private addSubscription(subscription: Subscription, newsService: NewsService,
    communicationService: CommunicationService, newsid: String, router: Router): void {
      subscription.add(newsService.getNews(newsid).subscribe((news: News) => {
        this.news = news;
      }, errors => {
        router.navigate(['error/'+errors.status]);
      }));
      subscription.add(communicationService.getLoggedIn().subscribe((loggedInState : boolean) => {
        this.loggedInAdmin = loggedInState;
      }, errors => {
        router.navigate(['error/'+errors.status]);
      }));
  }

  /**
   * Remove Subscription from component
   * 
   * @param subscription Subscription 
   */
  private removeSubscription(subscription: Subscription): void {
     subscription.unsubscribe();
  }

}
