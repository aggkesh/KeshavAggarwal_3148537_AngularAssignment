import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrecautionService {

  SERVER_URL: string = "http://localhost:4200/api/precautions";
  
  constructor(private httpClient: HttpClient) {}

  public getAllPrecautions() { 
       return this.httpClient.get(this.SERVER_URL);      
  }
 
}
