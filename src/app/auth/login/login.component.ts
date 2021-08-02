import {Component} from '@angular/core';
import {AuthService} from '@src/app/auth/auth.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {catchError, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';

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

  wrongLogin = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  submit() {
    this.wrongLogin = false;
    this.loading = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.username.value, this.password.value).pipe(
      mergeMap(() => this.router.navigate(['/home'])),
      catchError(err => {
        this.wrongLogin = true;
        this.loading = false;
        return of(err);
      }),
    ).subscribe();
  }

  errorVisible(control: AbstractControl) {
    return control.invalid && !control.pristine;
  }

  clearForm() {
    this.wrongLogin = false;
    this.form.reset();
  }
}
