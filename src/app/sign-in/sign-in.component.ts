import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../api/user-service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../api/communication-service/communication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription()
  loginFormGroup: FormGroup;
  errors: any;

  constructor(private userservice: UserService,
              private communicationService: CommunicationService, 
              private route: ActivatedRoute, 
              private router: Router) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
        email: new FormControl("", Validators.compose([
          Validators.required,  
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl("",Validators.compose([
          Validators.required,  
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]))
     });
  }

  ngOnDestroy(): void {
    this.removeSubscription(this.subscription);
  }

  _loginIn(user: User) {
    this.addSubscription(this.subscription, this.userservice, user, this.router);
  }
  
  private addSubscription(subscription: Subscription, userService: UserService, user: User, router: Router): void {
    subscription.add(this.userservice.login(user).subscribe((success: Boolean) => {
      if(success) {
        localStorage.setItem('LoggedInAsAdmin', "true")
        this.router.navigate([''], {relativeTo: this.route});
        this.communicationService.updateLoggedInState(true)
      } else{
        this.errors = "username or password is not valid.";
      }
    }, errors => {
      router.navigate(['error/'+errors.status]);
    }));
  }

  private removeSubscription(subscription: Subscription): void {
    subscription.unsubscribe();
  }

  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
  }
  
}
