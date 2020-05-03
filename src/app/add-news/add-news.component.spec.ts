import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewsComponent } from './add-news.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewsService } from '../api/news-service/news.service';
import { CommunicationService } from '../api/communication-service/communication.service';
import { Router, ActivatedRoute } from '@angular/router';

fdescribe('AddNewsComponent', () => {
  let component: AddNewsComponent;
  let fixture: ComponentFixture<AddNewsComponent>;
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
      declarations: [ AddNewsComponent ],
      providers: [NewsService, CommunicationService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.newsDetailsForm.controls.title.setValue('');
    component.newsDetailsForm.controls.description.setValue('');
    component.newsDetailsForm.controls.summary.setValue('');
    component.newsDetailsForm.controls.image.setValue('');
    expect(component.newsDetailsForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    const title = component.newsDetailsForm.controls.title;
    expect(title.valid).toBeFalsy();

    title.setValue('');
    expect(title.hasError('required')).toBeTruthy();
  });
  
  it('description field validity', () => {
    const description = component.newsDetailsForm.controls.description;
    expect(description.valid).toBeFalsy();

    description.setValue('');
    expect(description.hasError('required')).toBeTruthy();

  });

  it('summary field validity', () => {
    const summary = component.newsDetailsForm.controls.summary;
    expect(summary.valid).toBeFalsy();

    summary.setValue('');
    expect(summary.hasError('required')).toBeTruthy();

  });

  it('image field validity', () => {
    const image = component.newsDetailsForm.controls.image;
    expect(image.valid).toBeFalsy();

    image.setValue('');
    expect(image.hasError('required')).toBeTruthy();

  });

  it('form should be valid', () => {
    component.newsDetailsForm.controls.title.setValue('title');
    component.newsDetailsForm.controls.description.setValue('description');
    component.newsDetailsForm.controls.summary.setValue('summary');
    component.newsDetailsForm.controls.image.setValue('image');
    expect(component.newsDetailsForm.valid).toBeTruthy();
  });

});
