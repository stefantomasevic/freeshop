import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "../app-routing.module";
import { IndexComponent } from "./index/index.component";
import { WebLayoutComponent } from "./layout/web-layout.component";
import { ProductListComponent } from './ProductList/product-list/product-list.component';
import { MaterialModule } from "../admin/material.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatSliderModule } from '@angular/material/slider';
import { ProductDetailComponent } from './ProductList/ProductDetail/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from "./wishlist/wishlist.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        WebLayoutComponent,
        IndexComponent,
        WishlistComponent,
        ProductListComponent,
        ProductDetailComponent,
        ShoppingCartComponent,
    ],
    imports: [
        AppRoutingModule,
        NgbModule,
        BrowserModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSliderModule
       
    ],
    
})

export class WebModule {

}