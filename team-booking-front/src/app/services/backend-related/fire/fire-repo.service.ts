import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, getDoc, getDocs, doc, Firestore, Query,
  deleteDoc, onSnapshot, query, Unsubscribe, QueryConstraint, QueryCompositeFilterConstraint } from '@firebase/firestore';
import { Observable, of, from, map, concatMap, tap } from 'rxjs';
// import { getDatabase, ref, set, get, child, DatabaseReference } from "firebase/database";
import { ID, User } from 'src/app/model/model';
import { ToDoException } from 'src/app/classes/ToDoException';
import { DocumentData } from '@angular/fire/compat/firestore';

type ItemConsumer<T> = (item : T, operation:string) => void;
export class FireRepoService<T extends ID> {

  private MINIMAL_VALID_ID = 1;
  private readonly key: string;
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

  protected getDb(): Firestore {
    return getFirestore();
  }

  public create(item: T): Observable<ID> {
    const db = getFirestore();
    const docRef = addDoc(collection(db, this.key), item);
    const ret = from(docRef).pipe(
      tap(doc => item.id = doc.id),
      concatMap(doc => of({ id: doc.id }))
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

  public getById(id: ID): Observable<T> {
    console.log("getting " + this.key + " with id " + id.id);
    const inKey = this.key + "/" + id;
    const db = getFirestore();
    const docRef = doc(db, this.key, id.id);
    const docDataRef = getDoc(docRef);
    const ret = from(docDataRef).pipe(
      map(d=>{
        const ret = d.data() as T;
        ret.id = d.id;
        return ret;
      })
    );
    return ret;
  }

  public delete(item: ID): Observable<void> {
    const db = getFirestore();
    const tmp = deleteDoc(doc(db, this.key, item.id));
    const ret = from(tmp);
    return ret;
  }

  public getList(): Observable<T[]> {
    const db = getFirestore();
    const colRef = collection(db, this.key);
    const prom = getDocs(colRef);
    const ret = from(prom).pipe(
      map(q => {
        const ret : T[] = [];
        q.forEach(x => {
          const it = x.data() as T;
          it.id = x.id;
          ret.push(it);
        });
        return ret;
      })
    );
    return ret;
  }

  public getAll() : Observable<T>{
    const db = getFirestore();
    const colRef = collection(db, this.key);
    const prom = getDocs(colRef);
    const ret = from(prom).pipe(
      concatMap(q => {
        const ret : T[] = [];
        q.forEach(x => {
          const it = x.data() as T;
          it.id = x.id;
          ret.push(it);
        });
        return ret;
      })
    );
    return ret;
  }

  protected getListByQuery(queryConstraint : QueryConstraint) : Observable<T[]>{
    const db = getFirestore();
    const colRef = collection(db, this.key);
    const queryRef = query(colRef, queryConstraint);
    const resRef = getDocs(queryRef);
    const ret = from(resRef).pipe(
      map(q => {
        const utret: T[] = [];
        q.forEach(it => {
          const ut: T = it.data() as T;
          ut.id = it.id;
          utret.push(ut);
        });
        return utret;
      })
    );
    return ret;
  }

  protected getAllByQuery(queryConstraint : QueryConstraint| QueryCompositeFilterConstraint) : Observable<T>{
    const db = getFirestore();
    const colRef = collection(db, this.key);
    let queryRef : Query;
    if (queryConstraint instanceof QueryConstraint)
      queryRef = query(colRef, queryConstraint);
    else
      queryRef = query(colRef, queryConstraint as QueryCompositeFilterConstraint);
    const resRef = getDocs(queryRef);
    const ret = from(resRef).pipe(
      concatMap(q => {
        const utret: T[] = [];
        q.forEach(it => {
          const ut: T = it.data() as T;
          ut.id = it.id;
          utret.push(ut);
        });
        return utret;
      })
    );
    return ret;
  }

  public getAllLive(consumer: ItemConsumer<T>) : Unsubscribe{
    const db = getFirestore();
    const colRef = collection(db, this.key);
    const unsubscribe = onSnapshot(colRef, qs => {
      qs.forEach(q => {
        const item = q.data() as unknown as T;
        item.id = q.id;
        consumer(item, "new");
      });
      qs.docChanges().forEach(q => {
        const item = q.doc.data() as unknown as T;
        item.id = q.doc.id;
        consumer(item, q.type);
      })
    });
    return unsubscribe;
  }
}
