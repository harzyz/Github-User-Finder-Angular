import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';


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
  ) {}

  ngOnInit() {
    this.apiService.buttonClick$.subscribe(() => {
      this.show= true
    })
  }

}
