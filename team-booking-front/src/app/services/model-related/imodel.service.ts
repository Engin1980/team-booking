import { Observable } from "rxjs";
import { ID } from "../../model/model";

export abstract class IModelService<T extends ID>{
    public abstract insert(item:T):Observable<ID>
    public abstract update(item:T):Observable<void>
    public abstract delete(item:ID):Observable<void>
    public abstract getAll():Observable<T[]>
    public abstract getById(id:ID):Observable<T>
}