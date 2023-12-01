import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUsername', 'getRepos', 'buttonClick$']);

    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    });

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle API response correctly', fakeAsync(() => {
    const mockRepos = [{ id: 1, name: 'Repo 1' }, { id: 2, name: 'Repo 2' }];
    const mockUsername = 'testuser';

    apiService.getUsername.and.returnValue(of(mockUsername));
    apiService.getRepos.and.returnValue(of(mockRepos));

    fixture.detectChanges();
    tick();

    expect(component.username).toBe(mockUsername);
    expect(component.total).toEqual(mockRepos);
    expect(component.pages.length).toBe(1); // Assuming the limit is set to 10 in the component
    expect(component.currentPage).toBe(1);

    // ... Add more assertions as needed

    // You might want to test other functions like changePage, changeLimitHandler, etc.
  }));

  // Add more tests for edge cases, loading state, etc.

  it('should emit changePage event when changing the page', () => {
    spyOn(component.changePage, 'emit');
    component.currentPage = 2;
    component.nextPage();
    expect(component.changePage.emit).toHaveBeenCalledWith(3); // Assuming the limit is set to 10 in the component
  });

  // Add more tests as needed

  it('should emit changeLimit event when changing the limit', () => {
    spyOn(component.changeLimit, 'emit');
    component.changeLimitHandler(20);
    expect(component.changeLimit.emit).toHaveBeenCalledWith(20);
  });

  // it('should handle undefined or null username', fakeAsync(() => {
  //   apiService.getUsername.and.returnValue(of(null));

  //   fixture.detectChanges();
  //   tick();

  //   expect(component.username).toBeNull();
  //   // ... Add more assertions as needed
  // }));

  it('should handle empty result set', fakeAsync(() => {
    apiService.getRepos.and.returnValue(of([]));

    fixture.detectChanges();
    tick();

    expect(component.total.length).toBe(0);
    // ... Add more assertions as needed
  }));
});
