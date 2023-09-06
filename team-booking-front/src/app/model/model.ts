export interface ID{
    id : number;
}

export interface Team extends ID{
    title : string;
}

export interface User extends ID{
    email : string;
    nick : string;
    password : string;
    isSystemAdmin : boolean;
}

export interface UserTeam extends ID{
    userId : number;
    teamid : number;
    isAdmin : boolean;
}

export interface Event extends ID{
    title : string;
    date : Date;
}

export interface UserEvent extends ID{
    userId : number;
    eventId : number;
    groupId : string;
}

export interface Comment extends ID{
    text : string;
    userId : number;
    eventId : number;
}

export class ModelFactory{
    public static createUser(email:string, password:string, nick:string) :User{
        const ret : User = {
            id: 0,
            email:email,
            password : password,
            isSystemAdmin : false,
            nick : nick
        };

        return ret;
    }
}