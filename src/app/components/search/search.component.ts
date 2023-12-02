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
  isLoading: boolean = false

  constructor(
    private apiService: ApiService,
    private toast: ToastrService
  ) {}

  searchProfile(event: Event) {
    if(this.username.trim() === ''){
      this.toast.warning('Fill Search Input')
    }
    event.preventDefault();
    this.isLoading = true
    this.apiService.setUsername(this.username)
    this.apiService.triggerButtonClick()
  }

  clearSearch() {
    this.username = '';
    this.apiService.triggerClearButton()
  }

}
