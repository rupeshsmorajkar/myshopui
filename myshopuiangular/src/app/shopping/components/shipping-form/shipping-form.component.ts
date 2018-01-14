import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['order-success', result.key]);
  }  

}
