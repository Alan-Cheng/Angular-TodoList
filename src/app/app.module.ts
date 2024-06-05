import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TodoModule } from './todo/todo.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { AuthGuardService } from './core/auth-guard.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    TodoModule,
  ],
  providers: [
    {provide: 'auth', useClass: AuthService},
    {provide: 'user', useClass: UserService},
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
