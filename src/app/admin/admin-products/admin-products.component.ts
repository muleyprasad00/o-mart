import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  filteredProducts: Product[];

  page;
  pageSize;
  collectionSize;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.getAll().subscribe((p) => {
      this.filteredProducts = this.products = p;
      this.initilizeTable();
      // this.refreshTable();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async search(query) {
    if (!this.filteredProducts) return;
    this.filteredProducts = (await query)
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    if (!query) {
      this.initilizeTable();
    } else {
      this.collectionSize = this.filteredProducts.length;
    }
  }

  initilizeTable() {
    this.page = 1;
    this.pageSize = 5;
    this.collectionSize = this.filteredProducts.length;
    this.refreshTable();
  }

  refreshTable(query?) {
    if (!this.products) return;
    let filterList = query ? this.filteredProducts : this.products;

    this.filteredProducts = filterList
      .map((product, i) => ({ id: i + 1, ...product }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
