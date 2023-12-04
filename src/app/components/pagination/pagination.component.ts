import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Output() changePage = new EventEmitter<number>();
  @Output() changeLimit = new EventEmitter<number>();
  username:any = ''
  
  total: any = [];
  pages: number[] = [];
  

  constructor( 
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUsername().subscribe((res) => {
      this.username = res
      this.page()
    });
  }

  page() {
    this.apiService.getRepos(this.username, this.limit, this.currentPage).subscribe((result) => {
      this.total = result;
  
      // Calculate pages based on the total and current limit
      const pagesCount = Math.ceil(this.total.length / this.limit);
      this.pages = this.range(1, pagesCount);
  
      // Adjust current page if needed
      if (this.currentPage > this.pages.length) {
        this.currentPage = this.pages.length;
        this.changePage.emit(this.currentPage);
      }
  
      // Calculate indices based on the current page and limit
      const indexofLastItem = this.currentPage * this.limit;
      const indexofFirstItem = indexofLastItem - this.limit;
      const currentItems = this.total.slice(indexofFirstItem, indexofLastItem);
    });
  }
  

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.changePage.emit(this.currentPage);
    }
  }

  public changeLimitHandler(newLimit: number): void {
    this.limit = newLimit;
    this.changeLimit.emit(this.limit);
    this.page();
  }

}
