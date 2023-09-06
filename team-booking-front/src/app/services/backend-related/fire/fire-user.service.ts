import { Injectable } from '@angular/core';
import { IUserService } from '../../model-related/iuser.service';
import { ID, User } from 'src/app/model/model';
import { Observable, concatMap, map, of, from } from 'rxjs';
import { FireAuthService } from './fire-auth.service';
import { getDatabase, ref, set } from "firebase/database";
import { ToDoException } from 'src/app/classes/ToDoException';
import { FireRepoService } from './fire-repo.service';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';


@Injectable({
  providedIn: 'root'
})
export class FireUserService extends FireRepoService<User> implements IUserService {

  private loggedUser: User | null = null;

  constructor(
    private fireAuthService: FireAuthService) {
    super("users");
  }

  public getLoggedUser(): User | null {
    return this.loggedUser;
  }

  public logout(): Observable<void> {
    throw new ToDoException();
  }

  public override insert(user: User): Observable<ID> {
    const ret = this.fireAuthService.register(user).pipe(
      concatMap(_ => super.insert(user))
    );
    return ret;
  }

  public login(email: string, password: string): Observable<User> {
    const ret = this.fireAuthService.login(email, password)
      .pipe(
        concatMap(userCredential => this.getByEmail(userCredential.user.email ?? throwUnexpectedException()))
      );
    return ret;
  }

  public getByEmail(email: string): Observable<User> {
    throw new ToDoException();
  }

  public delete(item: ID): Observable<void> {
    throw new ToDoException();
  }

  public getAll(): Observable<User[]> {
    throw new ToDoException();
  }
}
