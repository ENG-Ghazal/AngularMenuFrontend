import { Component , OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from 'app/services/menu.service';
import { ItemServiceService } from 'app/services/item-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  menuForm: FormGroup;
  items: any[] = [];
  selectedItems: any[] = [];
  totalPrice: number = 0;
  submittedMenus: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private itemService: ItemServiceService
  ) {
    this.menuForm = this.formBuilder.group({
      items: [[]]
    });
  }
  ngOnInit(): void {
    this.loadItems();
    this.loadSubmittedMenus();
  }


  loadItems(): void {
    this.itemService.getItems().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }
  loadSubmittedMenus(): void {
    this.menuService.getMenus().subscribe(
      (data) => {
        this.submittedMenus = data;
      },
      (error) => {
        console.error('Error fetching submitted menus', error);
      }
    );
  }


addItemToMenu(item: any): void {
  this.selectedItems.push(item);
  this.calculateTotalPrice();
}
removeItemFromMenu(index: number): void {
  this.selectedItems.splice(index, 1);
  this.calculateTotalPrice();
}



calculateTotalPrice(): void {
  const itemIds = this.selectedItems.map(item => item.id);

 this.menuService.calculateTotalPrice({ item_ids: itemIds }).subscribe(
    (data) => {
      console.log(data);
      this.totalPrice = data.total_price;
      return data;
    },
    (error) => {
      console.error('Error calculating total price', error);
    }
  );
}

saveMenu(): void {
  const menuData = {
    item_ids: this.selectedItems.map(item => item.id)
  };

  this.menuService.createMenu(menuData).subscribe(
    (response) => {
      console.log('Menu created successfully', response);
      this.loadSubmittedMenus();
      this.selectedItems = [];
      this.totalPrice = 0;
      
    },
    (error) => {
      console.error('Error creating menu', error);
    }
  );
}


checkoutMenu(index: number): void {
  this.submittedMenus[index].checkedOut = true;
}
}
