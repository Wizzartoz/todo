import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userService: AuthService;
  private tokenStorage: TokenStorageService
  private router: Router;
  message:string = "";

  constructor(userService: AuthService, tokenStorage: TokenStorageService, router:Router) {
    this.userService = userService;
    this.tokenStorage = tokenStorage;
    this.router = router;
  }

  ngOnInit(): void {

  }

  submitForm(form: NgForm) {
    this.userService.login({
      login: form.value.login,
      password: form.value.password
    }).subscribe(data=>{
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUsername(data.username);
      this.tokenStorage.saveAuthorities(data.role);
      this.router.navigateByUrl('/todo');
      console.log(data)
    },error => {
      this.message = 'Password or Login is incorrect';
    })
  }
}
