import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../models/user.model';
import {AccountService} from '../services/account.service';

export const PasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pw = control.get('password').value;
  const pw2 = control.get('password2').value;
  if (pw && pw2 && pw === pw2) {
    return null;
  }
  return {'incorrectPassword': true};
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: User;
  success: boolean;
  constructor(
    private accService: AccountService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required])
    }, [PasswordValidation]);
  }

  fillModel() {
    this.user = new User();
    this.user.fullName = this.form.get('fullName').value;
    this.user.userName = this.form.get('userName').value;
    this.user.password = this.form.get('password').value;

  }

  submit() {
    if (this.form.valid) {
      this.fillModel();
      const reg$ = this.accService.register(this.user.userName, this.user.fullName, this.user.password).subscribe(res => {
        this.success = true;
        reg$.unsubscribe();
      }, err => {
        this.success = false;
        console.log(err);
      });
    }
  }


}
