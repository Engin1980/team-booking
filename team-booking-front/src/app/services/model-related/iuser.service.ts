import { Injectable } from '@angular/core';
import { User } from 'src/app/model/model';
import {Observable} from 'rxjs' ;
import { IModelService } from './imodel.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IUserService extends IModelService<User> {
  public abstract login(email:string, password:string) : Observable<User>;
  public abstract logout() : Observable<void>;
  public abstract getByEmail(email:string) : Observable<User>;
  public abstract getLoggedUser():User | null;
}
