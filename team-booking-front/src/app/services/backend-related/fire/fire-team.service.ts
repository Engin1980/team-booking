import { Injectable } from '@angular/core';
import { FireRepoService } from './fire-repo.service';
import { ID, ModelFactory, Team } from 'src/app/model/model';
import { ITeamService } from '../../model-related/iteam.service';
import { Observable } from 'rxjs';
import { FireUserTeamService } from './fire-userteam.service';
import { ToDoException } from 'src/app/classes/ToDoException';
import { doc, onSnapshot } from "firebase/firestore";

const KEY = "teams";
@Injectable({
  providedIn: 'root'
})
export class FireTeamService extends FireRepoService<Team> implements ITeamService {

  constructor(
    private userTeamService: FireUserTeamService
  ) { super(KEY); }

  public assignUser(team: ID, user: ID, isAdmin: boolean): Observable<ID> {
    const ut = ModelFactory.createUserTeam(user, team, isAdmin);
    return this.userTeamService.create(ut);
  }

  public removeUser(team: ID, user: ID): Observable<void> {
    throw new ToDoException();
  }

  public getAllByUser(user: ID): Observable<Team> {
    throw new ToDoException();
  }
}
