import { Injectable } from '@angular/core';
import { IModelService } from '../../model-related/imodel.service';
import { ID, UserTeam } from 'src/app/model/model';
import { FireRepoService } from './fire-repo.service';
import { Observable, from, map } from 'rxjs';
import { collection, getDocs, query, where } from 'firebase/firestore';

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
}
