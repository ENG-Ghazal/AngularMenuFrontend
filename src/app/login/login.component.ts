import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   loginForm : FormGroup;
   errorMessage = '';
   constructor(private formBuilder: FormBuilder , private authService:AuthService , private router: Router){
    this.loginForm = this.formBuilder.group(
      {
        email : ['', [Validators.required, Validators.email]],
        password : ['',[Validators.required , Validators.minLength(6) ]]
      });
   }

   onSubmit(){
    if(this.loginForm.valid){

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email,password).subscribe( data =>{
          const role = data.role;

        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/client']);
        }

      }
       , error =>{
        this.errorMessage = 'Invalid login credentials';
       }
      );

    }
     console.log(this.loginForm);

   }
}
