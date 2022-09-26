import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthLoginInfo} from "../model/auth/auth-login";
import {Observable} from "rxjs";
import {AuthRegister} from "../model/auth/auth-register";
import {TokenStorageService} from "./token-storage-service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environment.url;
  private http: HttpClient;
  private storage: TokenStorageService;
  private jwtHelper: JwtHelperService;

  constructor(http: HttpClient, storage: TokenStorageService, private route: Router, jwtHelper: JwtHelperService) {
    this.http = http;
    this.storage = storage;
    this.jwtHelper = jwtHelper;
  }

  public register(form: AuthRegister): Observable<any> {
    this.storage.storageClear();
    return this.http.post<any>(this.url + "register", form)
  }

  public login(form: AuthLoginInfo): Observable<any> {
    this.storage.storageClear();
    return this.http.post<any>(this.url + "login", form,{})
  }

  public logout() {
    this.storage.storageClear();
    window.location.reload();
    this.route.navigateByUrl('');
  }

  public isAuthenticate(): boolean {
    let token = this.storage.getToken();
    return token && !this.jwtHelper.isTokenExpired(token);
  }

}
