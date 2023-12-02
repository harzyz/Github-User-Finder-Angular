import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {
  username:any = ''
  loading = false
  currentPage = 1;
  popUpIndex = -1;
  limit = 10

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiService.getUsername().subscribe((res) => {
      this.username = res
      this.serachUser()
      this.search()
    });
    this.clearSearch()
  }
  user: any = [];
  data: any = [];


  serachUser() {
    if(this.username.trim() === ''){
      this.toastr.warning('Input Github Username')
    }else{
    this.loading = true;
  
    this.apiService.getUser(this.username).subscribe(
      (res) => {
        this.user = res;
        this.loading = false;
      },
      (error) => {
        this.loading = true;
        this.toastr.error('User not found')
        console.log(error)
      }
    );
    }
  }
  

  search() {
    this.loading = true
    return this.apiService.getRepos(this.username).subscribe((res) =>{
      this.data = res
      this.loading = false
    },(error) => {
      this.loading = false;
      console.log(error)
    });
  }

  clearSearch() {
    this.apiService.clearClick$.subscribe(() =>{
      this.data = [];
      this.user = [];
      window.location.reload();
    })
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
  
  changeLimitHandler(newLimit: number): void {
    this.limit = newLimit;
    this.search();
  }
  
}