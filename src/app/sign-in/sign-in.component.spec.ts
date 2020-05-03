import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../api/user-service/user.service';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        returnUrl: '/'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ SignInComponent ], 
      providers: [UserService, CommunicationService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.loginFormGroup.controls.email.setValue('');
    component.loginFormGroup.controls.password.setValue('');
    expect(component.loginFormGroup.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.loginFormGroup.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });
  
  it('password field validity', () => {
    const password = component.loginFormGroup.controls.password;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

  });

  it('form should be valid', () => {
    component.loginFormGroup.controls.email.setValue('sadasd@asd.com');
    component.loginFormGroup.controls.password.setValue('Wwerty1');
    expect(component.loginFormGroup.valid).toBeTruthy();
  });

});
