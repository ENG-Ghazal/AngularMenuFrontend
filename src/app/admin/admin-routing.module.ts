import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from '../guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } ,
    children:[{
      path: 'category',
      component : CategoryComponent,
      canActivate: [AuthGuard],
      data: {role: 'admin'}
    } ,{
      path: 'item',
      component : ItemComponent,
      canActivate: [AuthGuard],
      data: {role: 'admin'}
    }

  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
