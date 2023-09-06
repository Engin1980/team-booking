// import { Injectable } from '@angular/core';
// import { Observable, of, from, map, concatMap } from 'rxjs';
// import { getDatabase, ref, set, get, child, DatabaseReference } from "firebase/database";
// import { ID } from 'src/app/model/model';

// export class FireRepoService<T extends ID> {

//   private MINIMAL_VALID_ID = 1;
//   private readonly key : string;
//   constructor(key: string) { 
//     this.key = key;
//   }

//   public save(item: T): Observable<ID> {
//     if (item.id < this.MINIMAL_VALID_ID)
//       return this.insert(item);
//     else
//       return this.update(item).pipe(
//         concatMap(_ => of({ id: item.id }))
//       );
//   }

//   public insert(item: T): Observable<ID> {
//     const ret = this.getNextId().pipe(
//       concatMap(newId => {
//         item.id = newId;
//         return this.update(item).pipe(
//           concatMap(_ => of({id: newId}))
//         )
//       })
//     );
//     return ret;
//   }

//   public update(item: T): Observable<void> {
//     const inKey = this.key + "/" + item.id;
//     const db = getDatabase();
//     const dbRef = child(ref(db), inKey);
//     const setP = set(dbRef, item);
//     const ret = from(setP);
//     return ret;
//   }

//   public getById(id: any): Observable<T> {
//     const inKey = this.key + "/" + id;
//     const db = getDatabase();
//     let dbRef = child(ref(db), inKey);
//     const ret = from(get(dbRef)).pipe(
//       map(snapshot => snapshot.val as unknown as T)
//     );
//     return ret;
//   }

//   private getNextId(): Observable<number> {
//     const inKey = "ids/" + this.key;
//     const db = getDatabase();
//     let dbRef = child(ref(db), inKey);
//     const ret = from(get(dbRef))
//       .pipe(
//         map(res => res.val() != null ? +res.val() : 0),
//         concatMap(id => of(set(ref(db, inKey), id + 1)).pipe(map(_ => id)))
//       );
//     return ret;
//   }
// }
