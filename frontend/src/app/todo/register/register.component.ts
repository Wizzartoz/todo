import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage-service";
import {AuthError} from "../model/auth/auth-error";
import {JwtResponse} from "../model/auth/jwt-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private service: AuthService;
  private tokenStorage: TokenStorageService;
  private router : Router;
  errorMessage : string;

  constructor(service: AuthService, tokenStorage: TokenStorageService, router: Router) {
    this.service = service;
    this.tokenStorage = tokenStorage;
    this.router = router;
  }

  ngOnInit(): void {

  }

  submitForm(form: NgForm) {
    this.service.register({
      login: form.value.login,
      password: form.value.password,
      email: form.value.email,
      role: "ROLE_USER"
    }).subscribe((data:JwtResponse) => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUsername(data.username);
      this.tokenStorage.saveAuthorities(data.role);
      this.router.navigateByUrl('/todo');
    }, (error: AuthError) => {
      this.errorMessage = "You entered incorrect data"
    });
  }

}
