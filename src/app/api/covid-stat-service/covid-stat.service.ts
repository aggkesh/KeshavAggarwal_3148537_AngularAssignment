import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { CovidStateDetail } from 'src/app/model/covidstatedetail';
import { CovidDistrictDetail } from 'src/app/model/coviddistrictdetail';

interface ICovidStateWiseStat {
  statewise: Array<CovidStateDetail>
}

@Injectable({
  providedIn: 'root'
})
export class CovidStatService {

  SERVER_STATE_URL: string = "https://api.covid19india.org/data.json";
  SERVER_DISTRICT_URL: string = "https://api.covid19india.org/state_district_wise.json";

  constructor(private httpClient: HttpClient) { }

  public getCovidStateWiseData() {
    return this.httpClient.get<ICovidStateWiseStat>(this.SERVER_STATE_URL).pipe(map(response => response.statewise));
  }

  public getCovidDistrictWiseData(covidStateDetail: CovidStateDetail) {
    return this.httpClient.get(this.SERVER_DISTRICT_URL).pipe(map(response => {
      if(response.hasOwnProperty(covidStateDetail.state)) {
        var stateDetail = response[covidStateDetail.state];
        if(stateDetail.hasOwnProperty('districtData')) {
          var covidDistrictDetailArray: Array<CovidDistrictDetail> = new Array<CovidDistrictDetail>();
          var obj = stateDetail['districtData'];
          for(var key in obj) {
            var covidDistrictDetail:CovidDistrictDetail = obj[key];
            covidDistrictDetail.district = key;
            covidDistrictDetailArray.push(covidDistrictDetail);
          }
          covidStateDetail.districtData = covidDistrictDetailArray
          return covidStateDetail;
        }
      }
    }));
  }
}
