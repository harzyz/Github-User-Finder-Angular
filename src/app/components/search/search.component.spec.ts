import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['searchUsers', 'setUsername', 'triggerButtonClick']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchClicked event on search', () => {
    spyOn(component.searchClicked, 'emit');
    component.username = 'testuser';

    component.search(new Event('click'));

    expect(component.searchClicked.emit).toHaveBeenCalled();
  });

  it('should call ApiService methods on search', fakeAsync(() => {
    component.username = 'testuser';

    component.search(new Event('click'));
    tick();

    expect(apiService.setUsername).toHaveBeenCalledWith('testuser');
    expect(apiService.triggerButtonClick).toHaveBeenCalled();
  }));

  it('should show results and set loading state on successful API call', fakeAsync(() => {
    const mockResponse = { items: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }] };

    apiService.searchUsers.and.returnValue(of(mockResponse));

    component.search(new Event('click'));
    tick();

    expect(component.users).toEqual(mockResponse);
    expect(component.used).toEqual(mockResponse.items);
    expect(component.isLoading).toBe(false);
  }));

  it('should handle API error and show error toast', fakeAsync(() => {
    apiService.searchUsers.and.returnValue(throwError('API error'));

    component.search(new Event('click'));
    tick();

    expect(toastrService.error).toHaveBeenCalledWith('Error in request');
    expect(component.isLoading).toBe(false);
  }));

  it('should show error toast when search input is empty', () => {
    spyOn(toastrService, 'error');
    component.username = '';

    component.search(new Event('click'));

    expect(toastrService.error).toHaveBeenCalledWith('Fill Search Input');
    // Ensure that searchClicked event is not emitted
    expect(component.searchClicked.emit).not.toHaveBeenCalled();
  });
});
