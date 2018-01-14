import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: { [productId: string]:ShoppingCartItem }){
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            let x = new ShoppingCartItem({
                ...item,
                $key: productId
            });

            this.items.push(x);
            /*
            //imp - spread operator copies contents of item, equivalent to above code or Object.assign

            new ShoppingCartItem({
                // title: item.title,
                // imageUrl: item.imageUrl,
                // price: item.imageUrl,
                ...item,    //imp - spread operator copies contents of item, equivalent to above code or Object.assign
                $key: productId
            });

            Object.assign(x, item);
            x.$key = productId; */
        }
    }

    get totalItemsCount(): number {
        let count = 0;
        for(let productId in this.itemsMap) 
            count += this.itemsMap[productId].quantity;

        return count;
    }

    get totalPrice() {
        let price = 0;
        for(let productId in this.items) 
            price += this.items[productId].totalPrice;

        return price;
    }

    getQuantity(product: Product) {
        if(!this.itemsMap || !product)  return 0;

        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;    
    }
}