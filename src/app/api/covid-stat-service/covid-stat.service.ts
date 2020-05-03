import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CovidStateDetail } from 'src/app/model/covidstatedetail';
import { CovidDistrictDetail } from 'src/app/model/coviddistrictdetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidStatService {

  SERVER_STATE_URL: string = "https://api.covid19india.org/data.json";
  SERVER_DISTRICT_URL: string = "https://api.covid19india.org/state_district_wise.json";

  constructor(private httpClient: HttpClient) {}

  /**
   * Get All Covid Stats State Wise
   * 
   * @returns all the covid stats state wise.
   */
  public getCovidStateWiseData(): Observable<Array<CovidStateDetail>> {
    return this.httpClient.get(this.SERVER_STATE_URL).pipe(map(response => response['statewise']));
  }

  /**
   * Get All Covid Stats for all disctrict with given state whose details
   * are in covidStateDetail
   * 
   * @param covidStateDetail holding the details of the state for which covid district stats need to find out
   * @returns covid stats for the states and district in covidStateDetail
   */
  public getCovidDistrictWiseData(covidStateDetail: CovidStateDetail): Observable<CovidStateDetail> {
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

      return covidStateDetail;  
    }));
  }
}
