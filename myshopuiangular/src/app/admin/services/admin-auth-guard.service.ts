import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate {
  constructor(private authSarvice: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authSarvice.appUser$
      .map(appUser => appUser.isAdmin); 
  }
}
