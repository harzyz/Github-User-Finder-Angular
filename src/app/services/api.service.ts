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

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  
  getRepos(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
