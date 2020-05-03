import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from 'src/app/model/user';

fdescribe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrive user logged In via UserService GET', () => {
    let userData:User = {
       username: 'Admin', 
       email: 'keshav.aggarwal@nagarro.com', 
       password: 'Keshav1' 
    };

    let dummyUsers:User[] = [{
      username: 'Admin', 
      email: 'keshav.aggarwal@nagarro.com', 
      password: 'Keshav1' 
    },
    {
      username: 'Admin', 
      email: 'prashant.verma@nagarro.com', 
      password: 'Prashant1' 
    }];

    service.login(userData).subscribe((success: Boolean) => {
      expect(success).toBe(true);
    });

    const request = httpMock.expectOne(service.SERVER_URL);

    expect(request.request.method).toBe('GET');
    
    request.flush(dummyUsers);
  });

  it('should retrive user not logged via UserService GET', () => {
    let userData:User = {
       username: 'Admin', 
       email: 'keshav.aggarwal@nagarro.com', 
       password: 'Keshav1' 
    };

    let dummyUsers:User[] = [{
      username: 'Admin', 
      email: 'hem.garwal@nagarro.com', 
      password: 'Hem1' 
    },
    {
      username: 'Admin', 
      email: 'prashant.verma@nagarro.com', 
      password: 'Prashant1' 
    }];

    service.login(userData).subscribe((success: Boolean) => {
      expect(success).toBe(false);
    });
    
    const request = httpMock.expectOne(service.SERVER_URL);

    expect(request.request.method).toBe('GET');
    
    request.flush(dummyUsers);
  });

});
