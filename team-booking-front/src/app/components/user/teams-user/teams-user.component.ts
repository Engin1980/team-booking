import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { ModelFactory } from 'src/app/model/model';
import { ITeamService } from 'src/app/services/model-related/iteam.service';
import { IUserService } from 'src/app/services/model-related/iuser.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-teams-user',
  templateUrl: './teams-user.component.html',
  styleUrls: ['./teams-user.component.css']
})
export class TeamsUserComponent {
  form = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  constructor(
    private teamService: ITeamService,
    private userService: IUserService
  ) { }

  onSubmit() {
    const title = this.form.get("title")?.value ?? throwUnexpectedException();
    const team = ModelFactory.createTeam(title);
    const user = this.userService.getLoggedUser() ?? throwUnexpectedException();

    this.teamService.create(team).pipe(
      concatMap(id => this.teamService.assignUser(team, user, true))
    ).subscribe(
      _ => console.log("created")
    );
  }
}
