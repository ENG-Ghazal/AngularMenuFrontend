import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  userName: string = '';

  ngOnInit() {
      const currentUser = localStorage.getItem('currentUser');
      if(currentUser){
        const user = JSON.parse(currentUser);
        this.userName = user.name;
      }

  }
}
