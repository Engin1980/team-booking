import { Injectable } from '@angular/core';
import { IModelService } from './imodel.service';
import { ID, Team } from 'src/app/model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ITeamService extends IModelService<Team> {
  public abstract assignUser(team: ID, user: ID, isAdmin: boolean): Observable<ID>;
  public abstract removeUser(team: ID, user: ID): Observable<void>;
}
