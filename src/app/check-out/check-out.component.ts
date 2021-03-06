import { Subscription, from, Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
cart$:Observable<ShoppingCart>;
subscription:Subscription;

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
     }

}
