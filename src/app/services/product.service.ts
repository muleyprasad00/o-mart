import { Product } from './../models/product';
import { map} from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: Product;
  productsRef: AngularFireList<Product>;
  products: Observable<Product[]>;
  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list('products');
    // Use snapshotChanges().map() to store the key
    this.products = this.productsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  getAll() {
    return this.products;
  }
  get(key: string): AngularFireObject<Product> {
    return this.db.object('/products/' + key);
  }
  creat(product) {
    return this.productsRef.push(product);
  }
  update(key: string, product) {
    return this.productsRef.update(key, product);
  }
  delete(key: string) {
    return this.productsRef.remove(key);
  }
}
