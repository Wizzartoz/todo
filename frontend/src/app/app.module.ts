import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './todo/main.page/header/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TabComponent} from './todo/main.page/tab/tab.component';
import {ListComponent} from './todo/main.page/list/list.component';
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {ModalComponent, ModalContent} from './todo/main.page/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {LoginComponent} from './todo/login_page/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from './todo/error_page/error/error.component';
import {TodopageComponent} from './todo/main.page/todopage/todopage.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { RegisterComponent } from './todo/register/register.component';
import {httpInterceptorProviders} from "./todo/services/auth-interceptor.service";
import { HomePageComponent } from './todo/home-page/home-page.component';
import {SyncEnterGuard} from "./todo/guards/sync-enter.guard";
import {CdkMenuModule} from "@angular/cdk/menu";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {AuthPagesGuard} from "./todo/guards/auth-pages.guard";
import {CheckIsLoggedInGuard} from "./todo/guards/check-is-logged-in.guard";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatTreeModule} from "@angular/material/tree";
import { ToolbarComponent } from './todo/main.page/toolbar/toolbar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxPaginationModule} from "ngx-pagination";
import { SearchComponent } from './todo/main.page/search/search.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {AddHeaderInterceptor} from "./todo/services/header_interceptor";

const TOKEN_KEY = 'AuthToken';

export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [CheckIsLoggedInGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthPagesGuard,CheckIsLoggedInGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthPagesGuard,CheckIsLoggedInGuard]},
  {
    path: 'todo',
    component: TodopageComponent,
    canActivate: [SyncEnterGuard, CheckIsLoggedInGuard]
  },
  {path: '**', component: ErrorComponent, canActivate:[CheckIsLoggedInGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabComponent,
    ListComponent,
    ModalComponent,
    ModalContent,
    LoginComponent,
    ErrorComponent,
    TodopageComponent,
    RegisterComponent,
    HomePageComponent,
    ToolbarComponent,
    ToolbarComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonToggleModule,
    CdkMenuModule,
    NgxPaginationModule,
    MatNativeDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    MatProgressBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
