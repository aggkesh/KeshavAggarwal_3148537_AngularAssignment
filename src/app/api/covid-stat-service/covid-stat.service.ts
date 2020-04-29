import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { CovidStateDetail } from 'src/app/model/covidstatedetail';
import { CovidDistrictDetail } from 'src/app/model/coviddistrictdetail';

interface ICovidStateWiseStat {
  statewise: Array<CovidStateDetail>
}

interface ICovidDistrictWiseStat {
  statewise: Array<CovidDistrictDetail>
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

  public getCovidDistrictWiseData(stateName: string) {
    return this.httpClient.get(this.SERVER_DISTRICT_URL).pipe(map(response => {
      if(response.hasOwnProperty(stateName)) {
        var stateDetail = response[stateName];
        if(stateDetail.hasOwnProperty('districtData')){
            return stateDetail['districtData'];
        }
      }
    }));
  }
}
