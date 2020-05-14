import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from './services/account.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'testapp-client';
  isAuth: boolean;
  private authSub$: Subscription;
  constructor(private accService: AccountService) {
  }
  ngOnInit(): void {
    this.authSub$ = this.accService.auth.subscribe(res => {
      this.isAuth = res;
    });
  }
  ngOnDestroy(): void {
    this.authSub$.unsubscribe();
  }
}
