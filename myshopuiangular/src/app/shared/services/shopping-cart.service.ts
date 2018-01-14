import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreatecart();
    return this.db.object('/shopping-carts/' + cartId)
              .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreatecart();

    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreatecart(): Promise<string>{
    let cartId = localStorage.getItem('oshopCartId');
    if(cartId) 
      return cartId;

    let result = await this.create();
    localStorage.setItem('oshopCartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreatecart();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      /* if(item.$exists())  
        item$.update({ quantity: item.quantity + 1 });
      else 
        item$.update({ product: product, quantity: 1 });
      */
      let quantity = (item.quantity || 0) + change;

      if(quantity ===0) item$.remove();
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity:  quantity});
    });
  }

}
