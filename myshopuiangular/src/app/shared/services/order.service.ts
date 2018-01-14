import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  placeOrder(order) {
    return this.db.list('/orders').push(order);
  }

  getOrder() {
    return this.db.list('/orders');
  }

  getOrderByUserId(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  getOrderDetails(id) {
    console.log(id);
    return this.db.object("/orders/" + id);
  }
}
