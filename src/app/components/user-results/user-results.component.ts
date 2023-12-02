import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {
  username: any = '';
  loading = false;
  currentPage = 1;
  popUpIndex = -1;
  limit = 10;
  user: any = [];
  data: any = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiService.getUsername().subscribe((res) => {
      this.username = res;
      this.search();
      this.clearSearch()
    });
  }

  search() {
    if (this.username.trim() === '') {
      this.toastr.warning('Input Github Username');
      return;
    }

    this.loading = true;

    this.apiService.getUser(this.username).subscribe(
      (userRes) => {
        this.user = userRes;
        this.loading = false;
      },
      (userError) => {
        this.loading = false;
        this.toastr.error('User not found');
        console.log(userError);
      }
    );

    this.apiService.getRepos(this.username).subscribe(
      (reposRes) => {
        this.data = reposRes;
        this.loading = false;
      },
      (reposError) => {
        this.loading = false;
        console.log(reposError);
      }
    );
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

