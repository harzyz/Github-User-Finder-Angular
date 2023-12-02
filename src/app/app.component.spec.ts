import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['buttonClick$']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('Fyle Internship Challenge');
    expect(component.show).toBeFalse();
    expect(component.username).toBe('');
  });

  it('should set show to true on button click', () => {
    apiServiceSpy.buttonClick$ = of();
    component.ngOnInit();

    expect(component.show).toBeTrue();
  });

  it('should render the template correctly', () => {
    component.show = true;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.bg-[#011728]')).toBeTruthy();
    expect(compiled.querySelector('.font-bold').textContent).toContain('Fyle Internship Challenge');
  });

});
