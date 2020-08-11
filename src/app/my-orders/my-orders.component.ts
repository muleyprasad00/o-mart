import { Order } from './../models/order';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  userId:string;
  orders: any[];
  filteredOrder: any[];
  subscription: Subscription;
  page;
  pageSize;
  collectionSize;

  constructor( private auth:AuthService,
    private orderService: OrderService) {
      this.userId = localStorage.getItem('userId');
    }

  async ngOnInit(){
    this.subscription = this.orderService.getUsersOrder(this.userId).subscribe((p) => {
      this.filteredOrder = this.orders = p.map(p=>{
        return{
          key:p.key, ... p.payload.exportVal()
        }
      });
      this.initilizeTable();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initilizeTable() {
    this.page = 1;
    this.pageSize = 5;
    this.collectionSize = this.orders.length;
    this.refreshTable();
  }

  refreshTable() {
    this.filteredOrder = this.orders
      .map((order, i) => ({ id: i + 1, ...order }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
