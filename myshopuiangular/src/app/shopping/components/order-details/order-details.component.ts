import { OrderService } from '../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order$;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService) { 
  }

  async ngOnInit() {
    this.order$ = await this.route.params.switchMap(params => {
      return this.orderService.getOrderDetails(params.orderId);
    });
  }

}
