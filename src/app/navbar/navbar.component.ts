import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit  {
  isLoggedIn = false;
  isAdmin = false;
  constructor(private authService: AuthService, private router: Router){ }
   ngOnInit(): void{

    this.authService.currentUser.subscribe(
      user =>{
        this.isLoggedIn = !! user;
        if(user){
          const role = localStorage.getItem('role');
          this.isAdmin = role == 'admin';
        }
      }
    );

   }
   logout() {
    this.authService.logout();
    this.router.navigate(['']); // Redirect to homepage
  }
}
