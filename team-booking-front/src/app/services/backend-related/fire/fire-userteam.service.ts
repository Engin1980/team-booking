import { Injectable, Query } from '@angular/core';
import { IModelService } from '../../model-related/imodel.service';
import { ID, UserTeam } from 'src/app/model/model';
import { FireRepoService } from './fire-repo.service';
import { Observable, from, map } from 'rxjs';
import { QueryCompositeFilterConstraint, QueryConstraint, QueryFieldFilterConstraint, and, collection, getDocs, query, where } from 'firebase/firestore';

const KEY = "user-team"
@Injectable({
  providedIn: 'root'
})
export class FireUserTeamService extends FireRepoService<UserTeam> {

  constructor() {
    super(KEY);
  }

  public getListByUserId(id: ID): Observable<UserTeam[]> {
    const ret = super.getListByQuery(where("userId", "==", id.id));
    return ret;
  }

  public getAllByUserId(id: ID): Observable<UserTeam> {
    const ret = super.getAllByQuery(where("userId", "==", id.id));
    return ret;
  }

  public getListByTeamId(id: ID): Observable<UserTeam[]> {
    const ret = super.getListByQuery(where("teamId", "==", id.id));
    return ret;
  }

  public getAllByTeamId(id: ID): Observable<UserTeam> {
    const ret = super.getAllByQuery(where("teamId", "==", id.id));
    return ret;
  }

  public getByTeamIdAndUserId(teamId: ID, userId: ID): Observable<UserTeam | undefined> {
    const ret = super.getAllByQuery(
      and(
        where("teamId", "==", teamId.id), 
        where("userId", "==", userId.id)));
    return ret;
  }
}
