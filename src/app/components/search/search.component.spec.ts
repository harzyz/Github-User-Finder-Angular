import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['setUsername', 'triggerButtonClick']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchClicked event and call ApiService methods when form is submitted with non-empty input', () => {
    // Arrange
    component.username = 'testUser';

    // Act
    component.searchProfile(new Event('submit'));

    // Assert
    expect(apiServiceSpy.setUsername).toHaveBeenCalledWith('testUser');
    expect(apiServiceSpy.triggerButtonClick).toHaveBeenCalled();
    expect(component.searchClicked).toHaveBeenCalled();
  });

  it('should show error toast when form is submitted with empty input', () => {
    // Arrange
    component.username = '';

    // Act
    component.searchProfile(new Event('submit'));

    // Assert
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Fill Search Input');
  });
});
