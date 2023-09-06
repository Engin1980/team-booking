import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, ModelFactory } from 'src/app/model/model';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { IUserService } from 'src/app/services/model-related/iuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  form = new FormGroup({
    email: new FormControl("engin@osu.cz", Validators.email),
    password: new FormControl("dadadada", Validators.compose([
      Validators.minLength(8), Validators.required])),
    passwordAgain: new FormControl("dadadada"),
    nick: new FormControl('Ender Xenocida', Validators.compose([Validators.required, Validators.pattern('\\S+.*')]))
  });

  constructor(
    private userService: IUserService,
    private router: Router) { }

  onNgInit() {
    console.log("initialized");
  }

  onSubmit(): void {
    const email: string = this.form.get("email")?.value ?? throwUnexpectedException();
    const password: string = this.form.get("password")?.value ?? throwUnexpectedException();
    const nick: string = this.form.get("nick")?.value ?? throwUnexpectedException();
    const user = ModelFactory.createUser(email, password, nick);
    this.userService.create(user).subscribe(userId => {
      this.router.navigate(["user", "login"]);
    });
  }
}
