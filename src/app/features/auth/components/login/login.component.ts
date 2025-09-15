import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formlogin={
    username:'',
    password:''
  }
  onSubmit(form: NgForm) {
    console.log
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      // Handle login logic here
      console.log('Logging in with:', username, password);
    }
  }
}
