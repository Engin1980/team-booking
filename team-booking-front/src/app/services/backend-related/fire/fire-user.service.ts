import { Injectable } from '@angular/core';
import { IUserService } from '../../model-related/iuser.service';
import { ID, User } from 'src/app/model/model';
import { Observable, concatMap, map, of, from, tap, first } from 'rxjs';
import { FireAuthService } from './fire-auth.service';
import { ToDoException } from 'src/app/classes/ToDoException';
import { FireRepoService } from './fire-repo.service';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { collection, query, where, getDocs } from "firebase/firestore";


const KEY = "users";
@Injectable({
  providedIn: 'root'
})
export class FireUserService extends FireRepoService<User> implements IUserService {

  private loggedUser: User | null = null;

  constructor(
    private fireAuthService: FireAuthService) {
    super(KEY);
  }

  public getLoggedUser(): User | null {
    return this.loggedUser;
  }

  public logout(): Observable<void> {
    return this.fireAuthService.logout();
  }

  public override create(user: User): Observable<ID> {
    const ret = this.fireAuthService.register(user).pipe(
      concatMap(_ => {
        user.password = "";
        return super.create(user);
      } )
    );
    return ret;
  }

  public login(email: string, password: string): Observable<User> {
    const ret = this.fireAuthService.login(email, password)
      .pipe(
        concatMap(userCredential => this.getByEmail(userCredential.user.email ?? throwUnexpectedException())),
        tap(u => console.log("logged-in as " + JSON.stringify(u))),
        tap(u => this.loggedUser = u)
      );
    return ret;
  }

  public getByEmail(email: string): Observable<User> {
    const db = super.getDb();
    const usersRef = collection(db, KEY);
    const queryRef = query(usersRef, where("email", "==", email));
    const queryResultRef = getDocs(queryRef);
    const ret = from(queryResultRef).pipe(
      map(q => {
        const doc = q.docs[0];
        const u = doc.data() as unknown as User;
        u.id = doc.id;
        return u;
      })
    );
    return ret;
  }

  public delete(item: ID): Observable<void> {
    throw new ToDoException();
  }

  public getAll(): Observable<User[]> {
    throw new ToDoException();
  }
}
