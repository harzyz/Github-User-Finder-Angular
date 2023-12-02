import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  username:string = ''
  @Output() searchClicked = new EventEmitter<void>();
  isLoading: boolean = false

  constructor(
    private apiService: ApiService,
    private toast: ToastrService
  ) {}

  searchProfile(event: Event) {
    if(this.username.trim() === ''){
      this.toast.error('Fill Search Input')
    }
    event.preventDefault();
    this.searchClicked.emit();
    this.apiService.setUsername(this.username)
    this.apiService.triggerButtonClick()
  }

}
