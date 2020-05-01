import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrecautionService {

  SERVER_URL: string = "https://my-json-server.typicode.com/aggkesh/KeshavAggarwal_3148537_AngularAssignment/precautions";
  
  constructor(private httpClient: HttpClient) {}

  public getAllPrecautions() { 
       return this.httpClient.get(this.SERVER_URL);      
  }
 
}
