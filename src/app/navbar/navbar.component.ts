import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from './../models/shopping-cart';
import { CategoryService } from './../services/category.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$:Observable<ShoppingCart>;
  category
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = await this.cartService.getCart();
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
    });
  }

  logOut() {
    this.auth.logout();
  }
}
