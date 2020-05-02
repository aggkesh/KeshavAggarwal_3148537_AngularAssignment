import { Component, OnInit } from '@angular/core';
import { ErrorDetail } from '../model/errordetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {  private errorcode: string;
  errorDetail: ErrorDetail;

  constructor(private route: ActivatedRoute) { 
    this.errorcode = this.route.snapshot.params.errorcode;
  }

  ngOnInit(): void {
    this.errorDetail = this.getErrorModel(this.errorcode);
  }

  private getErrorModel(errorcode: string) {
    var errorDetail = new ErrorDetail();
    
    if(errorcode == "404") {
      errorDetail.statuscode = errorcode;
      errorDetail.title = "PAGE NOT FOUND.";
      errorDetail.description = "We Couldn't Find This Page"
    } else if(errorcode == "500") {
      errorDetail.statuscode = errorcode;
      errorDetail.title = "Internal Server Error.";
      errorDetail.description = "Problem Reaching Out Server Please Try Again Later"
    } else if(errorcode == "401"){
      errorDetail.statuscode = "401";
      errorDetail.title = "Unauthorized.";
      errorDetail.description = "Not Authorized To Access page"
    } else {
      errorDetail.statuscode = "404";
      errorDetail.title = "PAGE NOT FOUND.";
      errorDetail.description = "We Couldn't Find This Page"
    }

    return errorDetail;
  }
}
