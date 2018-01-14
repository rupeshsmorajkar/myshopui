import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('image-height') imageHeight:string;
  @Input('image-width') imageWidth: string;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
    if(!this.imageHeight)
      this.imageHeight = '15rem';

    if(!this.imageWidth)
      this.imageWidth = '24rem';
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  setImageStyle(){
    return {
      'height': this.imageHeight
    };
  }

}
