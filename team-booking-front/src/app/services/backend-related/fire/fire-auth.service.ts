import { Injectable } from '@angular/core';
import { User } from 'src/app/model/model';
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { from, Observable, tap, map, of, concatMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDoException } from 'src/app/classes/ToDoException';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  private readonly app = initializeApp(environment.firebase);
  private readonly auth = getAuth();

  public register(user: User): Observable<void> {
    const prom = createUserWithEmailAndPassword(this.auth, user.email, user.password)
    const obs = from(prom);
    const ret = obs.pipe(
      map(_ => void 0)
    );
    return ret;
  }

  public login(email: string, password: string): Observable<UserCredential> {
    const prom = signInWithEmailAndPassword(this.auth, email, password);
    const ret = from(prom);
    return ret;
  }

  public logout(): Observable<void> {
    const prom = signOut(this.auth);
    const ret = from(prom);
    return ret;
  }
}
