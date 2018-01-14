import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order$;
  userName: string;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private userService: UserService) {
    /* authService.user$.subscribe(user => this.userId = user.uid ); 
    this.order$ = orderService.getOrderByUserId(this.userId); */

    this.order$ = authService.user$.switchMap(u => {
      userService.get(u.uid).take(1).subscribe(user => this.userName = user.name );
      return orderService.getOrderByUserId(u.uid);
     });
  }

}
