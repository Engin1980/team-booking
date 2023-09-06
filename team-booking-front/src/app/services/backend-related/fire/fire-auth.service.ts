import { Injectable } from '@angular/core';
import { User } from 'src/app/model/model';
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { from, Observable, tap, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDoException } from 'src/app/classes/ToDoException';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  private readonly app = initializeApp(environment.firebase);
  private readonly auth = getAuth();
  private loggedUser: User | null = null;

  public register(user: User): Observable<void> {
    const prom$ = createUserWithEmailAndPassword(this.auth, user.email, user.password)
    const obs$ = from(prom$);
    const ret$ = obs$.pipe(
      tap(userCredential => this.loggedUser = null),
      map(_ => void 0)
    );
    return ret$;
  }

  public getLoggedUser(): User | null { return this.loggedUser; }

  public login(email: string, password: string): Observable<UserCredential> {
    throw new ToDoException();
  }
  public logout(): Observable<void> {
    throw new ToDoException();
  }
}
