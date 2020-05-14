import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiPrefix = 'http://localhost:5000/api/account';
  auth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
  }

  setAuth(state: boolean) {
    this.auth.next(state);
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('auth_token') != null;
  }

  login(username: string, password: string): Observable<string> {
    const url = `${this.apiPrefix}/token`;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<string>(url, JSON.stringify({userName: username, password}), {headers});
  }

  register(userName: string, fullName: string, password: string): Observable<any> {
    const url = `${this.apiPrefix}/register`;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, {userName, password, fullName}, {headers});
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
