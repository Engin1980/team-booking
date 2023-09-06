import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, getDoc, doc, Firestore } from '@firebase/firestore';
import { Observable, of, from, map, concatMap } from 'rxjs';
import { getDatabase, ref, set, get, child, DatabaseReference } from "firebase/database";
import { ID, User } from 'src/app/model/model';

export class FireRepoService<T extends ID> {

  private MINIMAL_VALID_ID = 1;
  private readonly key : string;
  constructor(key: string) { 
    this.key = key;
  }

  public save(item: T): Observable<ID> {
    if (item.id < this.MINIMAL_VALID_ID)
      return this.create(item);
    else
      return this.update(item).pipe(
        concatMap(_ => of({ id: item.id }))
      );
  }

  protected getDb(): Firestore{
    return getFirestore();
  }

  public create(item: T): Observable<ID> {
    const db = getFirestore();
    const docRef = addDoc(collection(db, this.key), item);
    const ret = from(docRef).pipe(
      concatMap(doc => of({id: doc.id}))
    );
    return ret;
  }

  public update(item: T): Observable<void> {
    const db = getFirestore();
    const docRef = doc(db, this.key, item.id);
    // @ts-ignore
    const updatedDocRef = updateDoc(docRef, item);
    const ret = from(updatedDocRef);
    return ret;
  }

  public getById(id: any): Observable<T> {
    const inKey = this.key + "/" + id;
    const db = getDatabase();
    let dbRef = child(ref(db), inKey);
    const ret = from(get(dbRef)).pipe(
      map(snapshot => snapshot.val as unknown as T)
    );
    return ret;
  }
}

class XA{
  public a:number = 8;
}

interface XB extends XA{
  b:number
}
