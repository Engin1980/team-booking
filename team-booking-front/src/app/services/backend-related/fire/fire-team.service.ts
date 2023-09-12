import { Injectable } from '@angular/core';
import { FireRepoService } from './fire-repo.service';
import { ID, ModelFactory, Team, User } from 'src/app/model/model';
import { ITeamService } from '../../model-related/iteam.service';
import { Observable, concatMap, map, tap } from 'rxjs';
import { FireUserTeamService } from './fire-userteam.service';
import { ToDoException } from 'src/app/classes/ToDoException';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { IUserService } from '../../model-related/iuser.service';

const KEY = "teams";
@Injectable({
  providedIn: 'root'
})
export class FireTeamService extends FireRepoService<Team> implements ITeamService {

  constructor(
    private userTeamService: FireUserTeamService,
    private userService: IUserService
  ) { super(KEY); }

  public assignMember(team: ID, user: ID, isAdmin: boolean): Observable<ID> {
    const ut = ModelFactory.createUserTeam(user, team, isAdmin);
    return this.userTeamService.create(ut);
  }

  public removeMember(team: ID, user: ID): Observable<void> {
    throw new ToDoException();
  }

  public getListByUser(user: ID): Observable<Team[]> {
    const db = super.getDb();
    const uts_ = this.userTeamService.getListByUserId(user);
    const ret = uts_.pipe(
      map(uts => {
        const teamRet: Team[] = [];
        for (let ut of uts) {
          const t = this.getById(ModelFactory.createId(ut.teamId)).subscribe(q => teamRet.push(q));
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
      concatMap(ut => this.getById(ModelFactory.createId(ut.teamId)))
    );
    return ret;
  }

  public getAllMembers(team: ID): Observable<User> {
    console.log("getting all members")
    const db = super.getDb();
    const ut_ = this.userTeamService.getAllByTeamId(team);
    const ret = ut_.pipe(
      tap(m => console.log("got member " + JSON.stringify(m))),
      concatMap(q => this.userService.getById(ModelFactory.createId(q.userId)))
    );
    return ret;
  }

  public isMemberAdmin(team: ID, user: ID): Observable<boolean> {
    const db = super.getDb();
    const ut_ = this.userTeamService.getByTeamIdAndUserId(team, user);
    const ret = ut_.pipe(
      map(res => (res != undefined) ? res.isAdmin : false)
    );
    return ret;
  }
}
