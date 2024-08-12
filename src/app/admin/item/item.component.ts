import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/services/category.service';
import { ItemServiceService } from 'app/services/item-service.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent  implements OnInit {

  itemForm: FormGroup;
  subcategories: any[] = [];
  items: any[] = [];
  noItemsMessage: string = '';
  errorMessages: string ='';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private itemService: ItemServiceService
  ){
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: [''],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSubcategories();
    this.loadItems();
  }


  loadSubcategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {

        this.subcategories = data.filter((category: Category) => {

        const isSubcategory = category.parent_id !== null;

        const hasNoChildren = !data.some(
          (potentialChild: Category) => potentialChild.parent_id === category.id);

          return isSubcategory && hasNoChildren;
        });
      },
      (error) => {
        console.error('Error fetching subcategories', error);
        this.errorMessages = error.message;
      }
    );
  }
  loadItems(): void {
    this.itemService.getItems().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length === 0) {
          this.noItemsMessage = 'There are no items ';}
      else {
          this.items = data;
        }
      },
      (error) => {
        console.error('Error fetching items', error);
        this.errorMessages = error.message;
      }
    );
  }

  addItem(): void {
    if (this.itemForm.valid) {
      this.itemService.addItem(this.itemForm.value).subscribe(() => {
        this.loadItems(); // Refresh the item list
        this.itemForm.reset();
      });
    }
  }
}
