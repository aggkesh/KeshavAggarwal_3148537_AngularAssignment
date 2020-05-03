import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Observable, Subject, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL: string = "http://localhost:4200/api/users";
  
  constructor(private httpClient: HttpClient) {}

  /**
   * Get if the user is logged in or not.
   * 
   * @param userData userData to check the match user login detail
   * @returns true if the user is logged in false otherwise
   */
  public login(userData: User): Observable<Boolean> {

    var loginSuccess$: Subject<Boolean> = new Subject<Boolean>();

    this.httpClient.get(this.SERVER_URL).subscribe((users: User[]) => {
      var success: Boolean = false;

      users.forEach(user => {
        if(user.email == userData.email && user.password == userData.password){
          success = true;
        }
      });

      loginSuccess$.next(success);
    })     

    return loginSuccess$;
  }

}
