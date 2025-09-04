import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';

const routes: Routes = [
  {
    path:'',
    component: ProductPageComponent
  },
  {
    path:'create',
    component: CreateProductComponent
  },
  { path: 'editar/:id', component: CreateProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
