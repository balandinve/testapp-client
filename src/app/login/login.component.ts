import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user.model';
import {PasswordValidation} from '../register/register.component';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  success: boolean;

  constructor(private accService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])

    });
  }

  fillModel() {
    this.user = new User();
    this.user.userName = this.form.get('userName').value;
    this.user.password = this.form.get('password').value;

  }

  submit() {
    if (this.form.valid) {
      this.fillModel();
      const login$ = this.accService.login(this.user.userName, this.user.password).subscribe(res => {
        localStorage.setItem('auth_token', res);
        this.accService.setAuth(true);
        this.router.navigate(['/products']);
        login$.unsubscribe();
      }, err => {
        this.success = false;
        console.log(err);
      });
    }
  }

}
