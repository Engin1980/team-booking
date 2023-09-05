import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  form = new FormGroup({
    email : new FormControl("@osu.cz"),
    password : new FormControl(""),
    passwordAgain : new FormControl("")
  });
  

  onNgInit() {
    console.log("initialized");
  }

  onSubmit() : void {
    const email = this.form.get("email")?.value;
    console.log("Registered: " + email);
  }
}
