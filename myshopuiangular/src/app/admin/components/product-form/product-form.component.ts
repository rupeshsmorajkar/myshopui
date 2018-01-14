import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(private router: Router,
      private route: ActivatedRoute,
      private catService: CategoryService, 
      private productService: ProductService) { 
    this.categories$ = catService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ' + this.id );
    if(this.id) {
      productService.get(this.id).take(1).subscribe(product => this.product = product);
    }

  }

  save(product) {
    if(this.id) 
      this.productService.update(this.id, product);
    else 
      this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you want to delete this product?'))  return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
