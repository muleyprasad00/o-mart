import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
  
  getOrderById(orderId:string):AngularFireObject<Order>{
    return this.db.object('/orders/' + orderId);
  }
  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getUsersOrder(userId: string) {
    return this.db.list('/orders', (ref) =>
      ref.orderByChild('userId').equalTo(userId)
    ).snapshotChanges();
  }
}
