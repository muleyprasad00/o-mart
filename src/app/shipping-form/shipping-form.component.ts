import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart:ShoppingCart;
  userId: string;
  subscription: Subscription;
  
  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.subscription = this.auth.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async placeOrder(shipping) {
    let order = new Order(this.userId, shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
