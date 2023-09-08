import { Component } from '@angular/core';
import { TeamsUserComponent } from '../../user/user-teams/user-teams.component';
import { ITeamService } from 'src/app/services/model-related/iteam.service';
import { ID, ModelFactory, Team, User } from 'src/app/model/model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent {

  protected team: Team | undefined;
  protected members: User[] = [];
  protected teamId: ID;

  constructor(
    private teamService: ITeamService,
    private route: ActivatedRoute
  ) {
    const tmp = route.snapshot.paramMap.get("id") ?? throwUnexpectedException("Team-id is empty");
    this.teamId = ModelFactory.createId(tmp);
  }

  ngOnInit() {
    console.log("init");
    this.teamService.getById(this.teamId).subscribe(
      q => this.team = q
    );
    this.teamService.getAllMembers(this.teamId).subscribe(
      q => this.members.push(q)
    );
  }
}
