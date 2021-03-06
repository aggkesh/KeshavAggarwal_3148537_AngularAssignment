import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from '../api/news-service/news.service';
import { Router } from '@angular/router';
import { News } from '../model/news';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../api/communication-service/communication.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  newsDetailsForm : FormGroup;
  errors : Array<string> = Array<string>();

  constructor(private newsService : NewsService,
              private communicationService: CommunicationService, 
              private router: Router) {}

  ngOnInit() : void {
    
    //check before adding news that user is loggedIn as admin
    if(!this.getLoggedInState()) {
      this.moveToErrorScreen("401", this.router);
    }

    this.newsDetailsForm = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        summary: new FormControl("", Validators.required),
        image: new FormControl("", Validators.required)
     });

     this.subscription.add(this.communicationService.getLoggedIn().subscribe((loggedInState : Boolean) => {
      this.router.navigate(['covidtracker/dashboard']);
    }))
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  /**
   * Save the news 
   * 
   * @param news news object from the form builder
   */
  _saveNews(news: News) : void {
    this.addSubscription(this.subscription,this.newsService, news, this.router, this.errors);
  }

  /**
   * Method takes the files (image) and convert it to base64
   * and store in newDetailsForm under image 
   * 
   * @param files files object (images) selected by user
   */
  handleFileInput(files: FileList) {
    var file:File = files.item(0);
    var myReader:FileReader = new FileReader();

    myReader.readAsDataURL(file);

    myReader.onloadend = (e) => {
      this.newsDetailsForm.patchValue({
        image: myReader.result as string
      });
    }
  }

  /**
   * add Subscription to the component
   * 
   * @param subscription Subscritpion
   * @param newsService NewsService
   * @param news news model 
   * @param router router 
   * @param errors errors array string if any
   */
  private addSubscription(subscription: Subscription, newsService: NewsService, 
                          news: News, router: Router, errors: Array<string>): void {
    subscription.add(newsService.createNews(news).subscribe((newsData:any) => {
      router.navigate(['covidtracker/latestnews']);
    },errors => {
      this.moveToErrorScreen(errors.status, router);
    }));
  }

  /**
   * remove subscription from component
   * 
   * @param subscription subscription object
   */
  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe(); 
  }

  /**
   * Get the Logged In State whehter user is loggedIn or not.
   */
  private getLoggedInState() {
    var loggedState = localStorage.getItem('LoggedInAsAdmin');
    return loggedState != null && loggedState == "true";
  }

  /**
   * Method move to error screen with given error code  
   * 
   * @param errorStatusCode error code 
   * @param router router
   */
  private moveToErrorScreen(errorStatusCode: string, router: Router) {
    router.navigate(['error/'+errorStatusCode]);
  }

  /**
   * Validation messages to be shown during form validation
   */
  news_validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required' }
    ],
    'description': [
      { type: 'required', message: 'Descrption is required' }
    ],
    'summary': [
      { type: 'required', message: 'Summary is required' }
    ]
  }
}
