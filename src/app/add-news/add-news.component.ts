import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from '../api/news-service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../model/news';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  newsDetailsForm : FormGroup;
  errors : Array<string>;

  constructor(private newsService : NewsService, 
              private route: ActivatedRoute, 
              private router: Router) {}

  ngOnInit() : void {
    this.newsDetailsForm = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        summary: new FormControl("", Validators.required),
        image: new FormControl('', Validators.required)
     });
     this.errors = [];
  }

  _addNews(data: News) {
    this.newsService.createNews(data).subscribe((newsData:any) => {
      this.router.navigate([''], {relativeTo: this.route});
    },errors => {
      console.log(errors);
      if(errors.status == 404){
        this.errors.push("Page Not Found");
      }
      else{
        let err = errors.error.errors;

        if(err != null && err.title != null){
          for(var index = 0;index < err.title.length;index++){
            this.errors.push("title field "+err.title[index]);
          }
        }
        if(err != null && err.description != null){
          for(var index = 0;index < err.description.length;index++){
            this.errors.push("description field "+err.description[index]);
          }
        }
        if(err != null && err.body != null){
          for(var index = 0;index < err.body.length;index++){
            this.errors.push("body field "+err.body[index]);
          }
        }
      }
    });
  }

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
