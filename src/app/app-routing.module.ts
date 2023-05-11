import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { ProductDetailsComponent } from './admin/product/product-details/product-details.component';
import { ProductComponent } from './admin/product/product.component';
import { IndexComponent } from './web/index/index.component';
import { WebLayoutComponent } from './web/layout/web-layout.component';
import { ProductListComponent } from './web/ProductList/product-list/product-list.component';
import { ProductDetailComponent } from './web/ProductList/ProductDetail/product-detail/product-detail.component';
import { ShoppingCartComponent } from './web/shopping-cart/shopping-cart.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { CustomerDetailsComponent } from './admin/customer/customer-details/customer-details.component';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryDetailsComponent } from './admin/category/category-details/category-details.component';
import { WishlistComponent } from './web/wishlist/wishlist.component';


const routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'products', component:  ProductListComponent },
      { path: 'product/edit/:id', component: ProductDetailsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'category/add', component: CategoryDetailsComponent },
      { path: 'category/edit/:id', component: CategoryDetailsComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'customer/add', component: CustomerDetailsComponent },
      { path: 'customer/edit/:id', component: CustomerDetailsComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product/add', component: ProductDetailsComponent },
      { path: 'product/edit/:id', component: ProductDetailsComponent }
    ]
  }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
