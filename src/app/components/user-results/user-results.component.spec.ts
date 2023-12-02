import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserResultsComponent } from './user-results.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('UserResultsComponent', () => {
  let component: UserResultsComponent;
  let fixture: ComponentFixture<UserResultsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUsername', 'getUser', 'getRepos']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'error']);

    TestBed.configureTestingModule({
      declarations: [UserResultsComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(UserResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search methods on ngOnInit', () => {
    // Arrange
    const username = 'testuser';
    apiServiceSpy.getUsername.and.returnValue(of(username));
    apiServiceSpy.getUser.and.returnValue(of({}));
    apiServiceSpy.getRepos.and.returnValue(of([]));

    // Act
    component.ngOnInit();

    // Assert
    expect(apiServiceSpy.getUsername).toHaveBeenCalledOnceWith();
    expect(apiServiceSpy.getUser).toHaveBeenCalledOnceWith(username);
    expect(apiServiceSpy.getRepos).toHaveBeenCalledOnceWith(username);
  });

  it('should show warning if username is empty on searchUser', () => {
    // Arrange
    apiServiceSpy.getUsername.and.returnValue(of(''));
    spyOn(component, 'search');

    // Act
    component.serachUser();

    // Assert
    expect(toastrServiceSpy.warning).toHaveBeenCalledOnceWith('Input Github Username');
    expect(component.search).not.toHaveBeenCalled();
  });

  it('should call APIs if username is not empty on searchUser', () => {
    // Arrange
    const username = 'testuser';
    apiServiceSpy.getUsername.and.returnValue(of(username));
    apiServiceSpy.getUser.and.returnValue(of({}));
    apiServiceSpy.getRepos.and.returnValue(of([]));

    // Act
    component.serachUser();

    // Assert
    expect(toastrServiceSpy.warning).not.toHaveBeenCalled();
    expect(apiServiceSpy.getUser).toHaveBeenCalledOnceWith(username);
    expect(apiServiceSpy.getRepos).toHaveBeenCalledOnceWith(username);
  });

  // Additional tests for other methods and edge cases
});

