import { Injectable, Query } from '@angular/core';
import { IModelService } from '../../model-related/imodel.service';
import { ID, UserTeam } from 'src/app/model/model';
import { FireRepoService } from './fire-repo.service';
import { Observable, concatMap, map, of } from 'rxjs';
import { and, where } from 'firebase/firestore';

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
    console.log("getting all members for team " + id.id);
    const ret = super.getAllByQuery(where("teamId", "==", id.id));
    return ret;
  }

  public getByTeamIdAndUserId(teamId: ID, userId: ID): Observable<UserTeam | undefined> {
    const ret = super.getListByQuery(
      and(
        where("teamId", "==", teamId.id),
        where("userId", "==", userId.id)))
      .pipe(
        concatMap(lst => {
          let ret: Observable<UserTeam[]>;
          if (lst.length > 1)
            ret = this.deleteMany(lst.slice(1)).pipe(map(_ => lst));
          else
            ret = of(lst);
          return ret;
        }),
        map(lst => (lst.length > 0) ? lst[0] : undefined)
        );
    return ret;
  }
}
