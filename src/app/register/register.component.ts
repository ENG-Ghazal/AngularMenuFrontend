import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ValidatorFn ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { User } from '../user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  errorMessage = '';
  constructor(private formbuilder: FormBuilder, private authService:AuthService , private router: Router){

    this.registrationForm = this.formbuilder.group({
      name : ['',Validators.required],
      email : ['',[Validators.required , Validators.email]],
      password : ['',[Validators.required , Validators.minLength(6) ]]

    } ); }



  onSubmit(){
    if(this.registrationForm.valid){
      const registeredUser :  User  =
      {
       name :this.registrationForm.value.name ,
       email: this.registrationForm.value.email,
       password: this.registrationForm.value.password
      }
      this.authService.registerUser(registeredUser).subscribe(
         data => {
          const role = data.role;
              if (role === 'admin') {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/client']);
              }
         },
         error =>{
           this.errorMessage = "Registration Faild"
         }

      );
    }
    else {
      // Mark all controls as touched to trigger validation messages
      this.registrationForm.markAllAsTouched();
    }

  }
}
