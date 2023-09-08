import { Injectable } from '@angular/core';
import { IModelService } from './imodel.service';
import { ID, Team, User } from 'src/app/model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ITeamService extends IModelService<Team> {
  public abstract assignMember(team: ID, user: ID, isAdmin: boolean): Observable<ID>;
  public abstract removeMember(team: ID, user: ID): Observable<void>;
  public abstract getAllMembers(team: ID): Observable<User>;
  public abstract isMemberAdmin(team: ID, user: ID): Observable<boolean>;
  public abstract getAllByUser(user: ID): Observable<Team>;
  public abstract getListByUser(user: ID): Observable<Team[]>;
}
