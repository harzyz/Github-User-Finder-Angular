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

  search(event: Event) {
    if(this.username.trim() === ''){
      this.toast.error('Fill Search Input')
    }
    event.preventDefault();
    this.searchClicked.emit();
    this.showResults()
    this.apiService.setUsername(this.username)
    this.apiService.triggerButtonClick()
  }

  users: any =[]
  used: any
  showResults(){
    this.isLoading = true;
    this.apiService.searchUsers(this.username).subscribe((res) =>{
      this.users = res || {}
      this.used = this.users.items || []
      console.log(this.users.items, 'item')
    },(error) =>{
      console.log('gettingData', error)
      this.toast.error('Error in request')
      this.isLoading = false;
    })
  }

}
