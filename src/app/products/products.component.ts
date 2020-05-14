import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {ProductService} from '../services/product.service';
import {ProductFilter} from '../models/product-filter.model';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filter: ProductFilter;
  products: Product[];
  pages: number[];
  page: number;
  take: number;
  total: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.page = 1;
    this.take = 10;
    this.filter = new ProductFilter();
    this.getProducts();
  }

  setPage(page: number) {
    this.filter.page = page;
    this.page = page;
    this.getProducts();
  }

  getProducts() {
    const products$ = this.productService.getProducts(this.filter).subscribe(res =>{
      this.products = res.products;
      this.total = res.quantity;
      const qty = Math.round(this.total / this.take) + (this.total % this.take === 0 ? 0 : 1);
      this.pages = new Array(qty);
    });
  }

  onKeyup(event: Event) {
    const title = (event.target as HTMLInputElement).value;
    this.filter.title = title;
    this.getProducts();
  }
}
