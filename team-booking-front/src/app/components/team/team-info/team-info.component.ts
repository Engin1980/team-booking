import { Component } from '@angular/core';
import { TeamsUserComponent } from '../../user/user-teams/user-teams.component';
import { ITeamService } from 'src/app/services/model-related/iteam.service';
import { Event, ID, ModelFactory, Team, User } from 'src/app/model/model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { IUserService } from 'src/app/services/model-related/iuser.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent {

  protected team: Team | undefined;
  protected members: User[] = [];
  protected events: Event[] = [];
  protected teamId: ID;
  protected isLoggedUserAdmin: boolean | undefined;

  protected formEvent = new FormGroup({
    title: new FormControl('', Validators.required),
    fromDate: new FormControl('2023-09-13'),
    fromTime: new FormControl('17:00'),
    durationInMinutes: new FormControl('90'),
    repeat: new FormControl(false),
    repeatToDate: new FormControl({ value: '', disabled: true }),
    repeatDayInterval: new FormControl({ value: 'w', disabled: true })
  });

  constructor(
    private teamService: ITeamService,
    private route: ActivatedRoute,
    private userService: IUserService
  ) {
    const tmp = route.snapshot.paramMap.get("id") ?? throwUnexpectedException("Team-id is empty");
    this.teamId = ModelFactory.createId(tmp);
  }

  ngOnInit() {
    this.teamService.getById(this.teamId).subscribe(
      q => this.team = q
    );
    this.teamService.getAllMembers(this.teamId).subscribe(
      q => this.members.push(q)
    );
    this.teamService.isMemberAdmin(this.teamId, this.userService.getLoggedUser() ?? throwUnexpectedException("User not logged in")).subscribe(
      q => this.isLoggedUserAdmin = true
    );
  }

  createEvent() {
    
  }

  formEventRepeatChanged() {
    const val = this.formEvent.get("repeat")?.value;
    if (val) {
      this.formEvent.get("repeatToDate")?.disable();
      this.formEvent.get("repeatDayInterval")?.disable();
    } else {
      this.formEvent.get("repeatToDate")?.enable();
      this.formEvent.get("repeatDayInterval")?.enable();
    }
  }
}
