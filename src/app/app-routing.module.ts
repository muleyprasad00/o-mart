import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductDetailsComponent } from './admin/product-details/product-details.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { FollowersComponent } from './followers/followers.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'', component:ProductsComponent},
  {path:'followers', component:FollowersComponent},
  {path:'profile/:id/:username', component:ProfileComponent},
  {path:'posts', component:PostsComponent},
  {path:'products', component:ProductsComponent},
  {path:'cart', component:ShoppingCartComponent},
  {path:'my-orders', component:MyOrdersComponent, canActivate:[AuthGuard]},
  {path:'check-out', component:CheckOutComponent, canActivate:[AuthGuard]},
  {path:'order-success/:id' , component:OrderSuccessComponent, canActivate:[AuthGuard]},
  {path:'view-order/:id' , component:ViewOrderComponent, canActivate:[AuthGuard]},

  {path:'admin/product/new', component:ProductDetailsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/product/:id', component:ProductDetailsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/products', component:AdminProductsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/orders', component:AdminOrdersComponent, canActivate:[AuthGuard]},

  {path:'login', component:LoginComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
