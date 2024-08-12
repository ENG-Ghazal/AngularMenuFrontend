import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { AuthService } from 'app/auth.service';
import { CategoryService } from 'app/services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  categories:any[] = [];
  isAdmin: boolean = false;
  showAddCategoryForm = false;
  categoryForm: FormGroup;
  showForm = false;
  isAddCategoryMode = true;
  errorMessagesFromApi = '';


 constructor(private categoryService: CategoryService ,
             private authService: AuthService ,
              private formBuilder: FormBuilder){

                this.categoryForm = this.formBuilder.group({
                  name: ['',Validators.required],
                  discount: [null],
                  parent_id:['',Validators.nullValidator]
                });
              }

 ngOnInit(): void {

      this.checkAdminRole();
      if (this.isAdmin) {
        this.loadCategories();
      }
 }

 checkAdminRole(): void {
  const currentUser = this.authService.currentUserValue;
  this.isAdmin = currentUser && currentUser.role === 'admin';
   }

 loadCategories(){
   this.categoryService.getCategories().subscribe(
    (data) =>{
      // console.log(data);
      this.categories = data;
    },
    (error) =>{
      // console.error('Error fetching categories', error);
      // console.error(error);
      this.errorMessagesFromApi = error;
    } );
 }
 addCategory() {
      console.log( this.categoryForm.value.name);
 if (this.categoryForm.valid) {
      //   if (!this.categoryForm.value.discount) {
      //     this.categoryForm.value.discount = null; 
      // }

    console.log(this.categoryForm.value);

    this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
      this.loadCategories(); // Refresh the category list
      this.categoryForm.reset();
      this.isAddCategoryMode = true;
    },
    (error) =>{
      this.errorMessagesFromApi = error;

    }

    );
  }
}
toggleAddCategoryMode() {
  this.isAddCategoryMode = !this.isAddCategoryMode;
}
}
//  onSubmit(): void {
//   if (this.categoryForm.valid) {
//       // console.log(this.categoryForm.value);
//     this.categoryService.addCategory(this.categoryForm.value).subscribe({
//       next: (response) => {
//         // Handle success, perhaps resetting the form or displaying a success message

//         this.loadCategories();
//         this.categoryForm.reset();
//         this.showForm = false;
//       },
//       error: (error) => {
//         // Handle error
//         console.error('Error adding category:', error);
//       }
//     });
//   }
// }


