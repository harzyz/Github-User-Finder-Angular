import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the username', () => {
    const username = 'johnpapa';

    // Set the username
    service.setUsername(username);

    // Get the username
    service.getUsername().subscribe((result) => {
      expect(result).toBe(username);
    });
  });

  it('should emit value on buttonClick$', (done: DoneFn) => {
    // Subscribe to the observable to listen for emitted values
    service.buttonClick$.subscribe(() => {
      // Expect that the value is emitted
      done();
    });

    // Trigger the button click
    service.triggerButtonClick();
  });


  it('should search users', () => {
    const username = 'testuser';

    // Mock response data
    const mockResponse = { items: [{ login: 'testuser' }] };

    // Perform the search
    service.searchUsers(username).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    // Expect a single request
    const req = httpTestingController.expectOne('https://api.github.com/search/users?q=${username}');

    // Respond with the mock data
    req.flush(mockResponse);
  });

  it('should get user', () => {
    const githubUsername = 'testuser';

    // Mock response data
    const mockResponse = { login: 'testuser', name: 'Test User' };

    // Perform the get user request
    service.getUser(githubUsername).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    // Expect a single request
    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);

    // Respond with the mock data
    req.flush(mockResponse);
  });

  it('should get repos', () => {
    const githubUsername = 'testuser';

    // Mock response data
    const mockResponse = [{ name: 'repo1' }, { name: 'repo2' }];

    // Perform the get repos request
    service.getRepos(githubUsername).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    // Expect a single request
    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}/repos`);

    // Respond with the mock data
    req.flush(mockResponse);
  });
});
