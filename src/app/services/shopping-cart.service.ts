import { ShoppingCart } from './../models/shopping-cart';
import { Product } from './../models/product';
import { AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private isCart = false;
  cartId:string;
  constructor(private db: AngularFireDatabase) {
    this.cartId = localStorage.getItem('cartId');
    if (!this.cartId) {
      const result = this.create();
      if (result) {
        localStorage.setItem('cartId', result.key);
        this.cartId = result.key;
      }
    }
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    //const cartId = await this.getOrCreateCartId();

    return this.db
      .object('/shopping-carts/' + this.cartId)
      .snapshotChanges()
      .pipe(
        map((x) => {
          return new ShoppingCart(x.payload.exportVal().items);
        })
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    //let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + this.cartId + '/items').remove();
  }

  private create() {
    if (this.isCart) return;
    this.isCart = true;
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  // private async getOrCreateCartId(): Promise<string> {
  //   const cartId = localStorage.getItem('cartId');
  //   if (cartId) return cartId;

  //   const result = await this.create();
  //   if (result) {
  //     localStorage.setItem('cartId', result.key);
  //     return result.key;
  //   }
  // }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItem(product: Product, change: number) {
   // let cartId = await this.getOrCreateCartId();
    let item$$ = this.getItem(this.cartId, product.key);
    let item$: Observable<any> = item$$.valueChanges().pipe(take(1));

    item$.subscribe((item) => {
      if (item === null) {
        item$$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: change,
        });
      } else {
        let quantity = (item.quantity || 0) + change;
        if (quantity === 0) return item$$.remove();
        item$$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity,
        });
      }
    });
  }
}
