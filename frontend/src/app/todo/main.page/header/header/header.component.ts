import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {CheckIsLoggedInGuard} from "../../../guards/check-is-logged-in.guard";
import {Router} from "@angular/router";
import {TaskService} from "../../../services/task-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  service: AuthService;
  authGuard: CheckIsLoggedInGuard
  router: Router

  constructor(service: AuthService, authGuard: CheckIsLoggedInGuard, router: Router, private taskService: TaskService) {
    this.service = service;
    this.authGuard = authGuard;
    this.router = router;
  }

  ngOnInit(): void {
    this.authGuard.entities$.subscribe(data => this.isLoggedIn = data);

  }

}
