import {Component} from '@angular/core';
import {AuthService} from '@src/app/auth/auth.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {catchError, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {UtilityService} from '@src/app/utility/utility.service';

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
    private utilityService: UtilityService,
  ) {}

  submit() {
    this.wrongLogin = false;
    this.utilityService.dismissSoftKeyBoard();

    if (this.form.invalid) {
      this.username.markAsDirty();
      this.password.markAsDirty();
      return;
    }

    this.loading = true;

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
    this.utilityService.dismissSoftKeyBoard();
  }
}
