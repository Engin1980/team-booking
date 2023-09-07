import { Observable } from "rxjs";
import { ID } from "../../model/model";
import { Unsubscribe } from "firebase/firestore";

type ItemConsumer<T> = (item: T, operation: string) => void;
export abstract class IModelService<T extends ID>{
    public abstract create(item: T): Observable<ID>
    public abstract update(item: T): Observable<void>
    public abstract delete(item: ID): Observable<void>
    public abstract getAll(): Observable<T[]>
    public abstract getById(id: ID): Observable<T>
    public abstract getAllSnapshot(consumer: ItemConsumer<T>): Unsubscribe
}