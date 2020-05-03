import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Precaution } from 'src/app/model/precaution';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrecautionService {

  SERVER_URL: string = "http://localhost:4200/api/precautions";
  
  constructor(private httpClient: HttpClient) {}

  /**
   * Get All the precautions present in db.
   * 
   * @returns precautions present in db.
   */
  public getAllPrecautions(): Observable<Array<Precaution>> { 
       return this.httpClient.get<Array<Precaution>>(this.SERVER_URL);      
  }
 
}
