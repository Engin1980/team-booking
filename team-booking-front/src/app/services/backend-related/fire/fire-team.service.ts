import { Injectable } from '@angular/core';
import { FireRepoService } from './fire-repo.service';
import { ID, ModelFactory, Team } from 'src/app/model/model';
import { ITeamService } from '../../model-related/iteam.service';
import { Observable, concatMap, map } from 'rxjs';
import { FireUserTeamService } from './fire-userteam.service';
import { ToDoException } from 'src/app/classes/ToDoException';
import { collection, doc, onSnapshot } from "firebase/firestore";

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

  public getListByUser(user: ID): Observable<Team[]> {
    const db = super.getDb();
    const uts_ = this.userTeamService.getListByUserId(user);
    const ret = uts_.pipe(
      map(uts => {
        const teamRet: Team[] = [];
        for (let ut of uts) {
          const t = this.getById(ut.teamid).subscribe(q => teamRet.push(q));
        }
        return teamRet;
      })
    );
    return ret;
  }

  public getAllByUser(user: ID): Observable<Team> {
    const db = super.getDb();
    const ut_ = this.userTeamService.getAllByUserId(user);
    const ret = ut_.pipe(
      concatMap(ut => this.getById(ut.teamid))
    );
    return ret;
  }
}
