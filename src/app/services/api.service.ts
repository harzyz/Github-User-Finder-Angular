import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usernameSubject = new BehaviorSubject<string>('');
  private buttonClickSubject = new Subject<void>();
  private apiUrl = 'https://api.github.com';  

  buttonClick$ = this.buttonClickSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }


  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  triggerButtonClick() {
    this.buttonClickSubject.next();
  }


  searchUsers(username: string) {
    if (!username.trim()) {
      // If the username is empty, return an empty observable or handle it appropriately
     console.log('object');
    }

    const params = new HttpParams().set('q', username);
    const url = `${this.apiUrl}/search/users`;

    return this.httpClient.get(url, { params });
  }
  // searchUsers(username: string): Observable<any> {
  //   const url = `https://api.github.com/search/users?q=${username}`;
  //   return this.httpClient.get(url);
  // }
  
  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  
  getRepos(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
