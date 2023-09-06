import { Injectable } from '@angular/core';
import { IModelService } from '../../model-related/imodel.service';
import { UserTeam } from 'src/app/model/model';
import { FireRepoService } from './fire-repo.service';

const KEY = "user-team"
@Injectable({
  providedIn: 'root'
})
export class FireUserTeamService extends FireRepoService<UserTeam> {

  constructor() {
    super(KEY);
   }
}
