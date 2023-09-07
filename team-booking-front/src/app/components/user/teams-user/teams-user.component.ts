import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { ModelFactory, Team } from 'src/app/model/model';
import { ITeamService } from 'src/app/services/model-related/iteam.service';
import { IUserService } from 'src/app/services/model-related/iuser.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-teams-user',
  templateUrl: './teams-user.component.html',
  styleUrls: ['./teams-user.component.css']
})
export class TeamsUserComponent {
  protected form = new FormGroup({
    title: new FormControl('', Validators.required)
  });
  protected teams: Team[] = [];

  constructor(
    private teamService: ITeamService,
    private userService: IUserService
  ) { }

  ngOnInit() {
    // const loggedUser = this.userService.getLoggedUser() ?? throwUnexpectedException("No logged user");
    // this.teamService.getAllByUser(loggedUser);
    // this.teamService.getAll().subscribe(q => this.teams = q);
    this.teamService.getAllSnapshot((t, d) => {
      if (d === "added") {
        this.teams.push(t);
      }
    });

  }

  onSubmit() {
    const title = this.form.get("title")?.value ?? throwUnexpectedException("title is null");
    const team = ModelFactory.createTeam(title);
    const user = this.userService.getLoggedUser() ?? throwUnexpectedException("logged-user is null");

    this.teamService.create(team).pipe(
      concatMap(id => this.teamService.assignUser(team, user, true))
    ).subscribe(
      _ => console.log("created")
    );
  }
}
