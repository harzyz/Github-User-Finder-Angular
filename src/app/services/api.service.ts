import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usernameSubject = new BehaviorSubject<string>('');
  private buttonClickSubject = new Subject<void>();
  private clearClickSubject = new Subject<void>();  

  buttonClick$ = this.buttonClickSubject.asObservable();
  clearClick$ = this.clearClickSubject.asObservable();

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

  triggerClearButton() {
    this.clearClickSubject.next();
  }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  
  getRepos(githubUsername: string, limit: number, page: number) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?per_page=${limit}&page=${page}`);
  }

  getPages(githubUsername: string){
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`)
  }

  

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
