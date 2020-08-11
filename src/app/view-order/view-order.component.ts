
import { OrderService } from './../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { take } from 'rxjs/operators';
import {Location} from '@angular/common';
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
id:string
order:Order
  constructor(
    public location: Location,
    private orderService:OrderService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
   // if(!this.id) return;
    const _take = this.orderService.getOrderById(this.id)
        .valueChanges()
        .pipe(take(1));
      _take.subscribe((p) => (this.order = p));
      
  }

  
  totalPrice(){
    if(!this.order) return 0;
    let sum = 0;
    for (let i in this.order.items) sum += this.order.items[i].totalPrice;
    return sum;
  }

}
