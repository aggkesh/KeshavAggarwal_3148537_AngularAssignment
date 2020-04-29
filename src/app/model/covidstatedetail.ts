import { CovidDistrictDetail } from './coviddistrictdetail';

export interface CovidStateDetail {
  active: string,
  confirmed: string,
  deaths: string,
  recovered: string,
  state: string,
  statecode: string,
  districtData: Array<CovidDistrictDetail>
  lastupdatedtime: string
}