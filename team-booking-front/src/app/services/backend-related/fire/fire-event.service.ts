import { Injectable } from '@angular/core';
import { IEventService } from '../../model-related/ievent.service';
import { ExternalExpr } from '@angular/compiler';
import { FireRepoService } from './fire-repo.service';
import { Event, ID } from 'src/app/model/model';
import { Observable, concat, concatAll, concatMap, map, tap, zip } from 'rxjs';
import { Query, QueryConstraint, where } from 'firebase/firestore';

const KEY = "events";
@Injectable({
  providedIn: 'root'
})
export class FireEventService extends FireRepoService<Event>  implements IEventService {

  constructor() { 
    super(KEY);
  }

  public createList(events: Event[]): Observable<void> {
    const creators : Observable<ID>[] = [];
    for (let event of events){
      const creator = this.create(event);
      creators.push(creator);
    }

    const ret = zip(creators).pipe(
      map (_ => void 0)
    );
    return ret;
  }

  public getAllByTeamId(teamId: ID): Observable<Event> {
    const filter = where("teamId", "==", teamId.id);
    const ret = super.getAllByQuery(filter).pipe(
      tap(q=>q.date = new Date((q.date as any).seconds * 1000))
    );
    return ret;
  }
}

