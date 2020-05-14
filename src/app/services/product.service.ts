import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductFilter} from '../models/product-filter.model';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiPrefix = 'http://localhost:5000/api/product';

  constructor(private http: HttpClient) {
  }

  getProducts(filter: ProductFilter): Observable<any> {
    const params = new URLSearchParams();
    Object.keys(filter).forEach(f => {
      params.append(f, filter[f]);
    });
    const url = `${this.apiPrefix}/list?${params}`;
    return this.http.get<any>(url);
  }

  getQuantity(): Observable<number> {
    const url = `${this.apiPrefix}/quantity`;
    return this.http.get<number>(url);
  }
}
