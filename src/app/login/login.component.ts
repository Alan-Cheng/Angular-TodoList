import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  username!: string;
  password!: string;

  constructor(@Inject('auth') private service: AuthService) {}

  ngOnInit() {}

  onSubmit(formValue: any) {
    console.log(this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }
}
