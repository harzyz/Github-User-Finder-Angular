import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Fyle Internship Challenge'
  show: boolean = false
  username: string = ''

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    
    this.apiService.buttonClick$.subscribe(() => {
    this.show= true
    // this.showResults()
    })
  }
  users: any =[]
  // showResults(){
  //   this.apiService.searchUsers(this.username).subscribe((res) =>{
  //     let {item} = res
  //     this.users = item
  //     console.log(item, 'item')
  //   })
  // }

}
