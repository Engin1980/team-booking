import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { IUserService } from 'src/app/services/model-related/iuser.service';



@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  form = new FormGroup({
    email: new FormControl("engin@osu.cz", Validators.email),
    password: new FormControl("dadadada", Validators.compose([
      Validators.minLength(8), Validators.required]))
  });

  constructor(
    private userService: IUserService,
    private router : Router) { }

  onSubmit(): void {
    const email: string = this.form.get("email")?.value ?? throwUnexpectedException();
    const password: string = this.form.get("password")?.value ?? throwUnexpectedException();

    this.userService.login(email, password)
      .subscribe(loggedUser => this.router.navigate(["user", loggedUser.id, "teams"]));
  }
}
