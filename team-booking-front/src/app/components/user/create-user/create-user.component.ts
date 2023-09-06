import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { User, ModelFactory } from 'src/app/model/model';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { IUserService } from 'src/app/services/model-related/iuser.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  form = new FormGroup({
    email : new FormControl("engin@osu.cz", Validators.email),
    password : new FormControl("dadadada", Validators.compose([
      Validators.minLength(8), Validators.required])),
    passwordAgain : new FormControl("dadadada"),
    nick : new FormControl('Ender Xenocida', Validators.compose([Validators.required, Validators.pattern('\\S+.*')]))
  });
  
  constructor(private userService : IUserService){}

  onNgInit() {
    console.log("initialized");
  }

  onSubmit() : void {
    console.log("submited");
    const email : string = this.form.get("email")?.value ?? throwUnexpectedException();
    const password : string = this.form.get("password")?.value ?? throwUnexpectedException();
    const nick : string = this.form.get("nick")?.value ?? throwUnexpectedException();
    console.log("gotdata");
    const user = ModelFactory.createUser(email, password, nick);
    console.log("user-created");
    this.userService.insert(user).subscribe(userId=>{
      console.log("user created as " + userId);
    });
  }
}
