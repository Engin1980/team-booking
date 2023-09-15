import { Injectable } from '@angular/core';
import { IModelService } from './imodel.service';
import { Event, ID, Team, User } from 'src/app/model/model';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
    providedIn: 'root'
})
export abstract class IEventService extends IModelService<Event> {
    public abstract createList(events: Event[]): Observable<void>;
    public abstract getAllByTeamId(teamId : ID):Observable<Event>;
}
