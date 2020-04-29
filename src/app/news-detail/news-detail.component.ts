import { Component, OnInit } from '@angular/core';
import { News } from '../model/news';
import { NewsService } from '../api/news-service/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news: News;
  admin: Boolean;
  newsid: string;

  constructor(private newsService: NewsService, private activatedroute: ActivatedRoute) {
    this.newsid = this.activatedroute.snapshot.params.newsid;
  }

  ngOnInit(): void {
    this.newsService.getNews(this.newsid).subscribe((news: News) => {
      console.log(news);
      this.news = news;
    })
  }

  _deleteNews() {
  }

  _editNews() {    
  }

}
