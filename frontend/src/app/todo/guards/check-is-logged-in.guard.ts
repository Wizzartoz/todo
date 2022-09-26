import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class CheckIsLoggedInGuard implements CanActivate {
  // @ts-ignore
  public entities$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private service: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.service.isAuthenticate()) {
        localStorage.clear();
    }
    this.entities$.next(this.service.isAuthenticate());
    return true;
  }

}
