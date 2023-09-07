import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, getDoc, getDocs, doc, Firestore, deleteDoc, onSnapshot, QuerySnapshot, Unsubscribe } from '@firebase/firestore';
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

  public getById(id: any): Observable<T> {
    const inKey = this.key + "/" + id;
    const db = getFirestore();
    const docRef = doc(db, this.key, id);
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

  public getAll(): Observable<T[]> {
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

  public getAllSnapshot(consumer: ItemConsumer<T>) : Unsubscribe{
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
