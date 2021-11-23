import {Component, OnInit} from '@angular/core';
import {AuthService} from '@src/app/auth/auth.service';
import {Router} from '@angular/router';
import {UtilityService} from '@src/app/utility/utility.service';

@Component({
  selector: 'app-role-redirect',
  template: '',
})
export class RoleRedirect implements OnInit {
  constructor(
    private authService: AuthService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit() {
    const path = this.getRedirectPath();
    this.router.navigate([path]).catch();
  }

  private getRedirectPath() {
    // if user go tu user area
    if (this.authService.hasRoleUser()) {
      return '/';
    }

    // admin can login only on web.
    // if mobile clear token and go back to login
    if (this.utilityService.isMobile()) {
      this.authService.clearToken();
      return '/login';
    }

    // if web go to admin area
    return '/admin';
  }
}
