import {Component} from '@angular/core';
import {AuthService} from '@src/app/auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });

  get username() {
    return this.form.get('username');
  }

  get password()  {
    return this.form.get('password');
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log('ok', this.username, this.password);
  }
}
