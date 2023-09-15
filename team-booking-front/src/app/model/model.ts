export interface ID {
    id: any;
}

export interface Team extends ID {
    title: string;
}

export interface User extends ID {
    email: string;
    nick: string;
    password: string;
    isSystemAdmin: boolean;
}

export interface UserTeam extends ID {
    userId: number;
    teamId: number;
    isAdmin: boolean;
}

export interface Event extends ID {
    title: string;
    date: Date;
    teamId : any,
    duration : number,
    groupId : any
}

export interface UserEvent extends ID {
    userId: number;
    eventId: number;
    groupId: string;
}

export interface Comment extends ID {
    text: string;
    userId: any;
    eventId: any;
}

export class ModelFactory {

    static createId(id: any): ID {
        const ret: ID = {
            id: id
        };
        return ret;
    }

    static createUserTeam(user: ID, team: ID, isUserAdmin: boolean) {
        const ret: UserTeam = {
            id: 0,
            userId: user.id,
            teamId: team.id,
            isAdmin: isUserAdmin
        };
        return ret;
    }
    static createTeam(title: string) {
        const ret: Team = {
            id: 0,
            title: title
        };
        return ret;
    }

    public static createUser(email: string, password: string, nick: string): User {
        const ret: User = {
            id: 0,
            email: email,
            password: password,
            isSystemAdmin: false,
            nick: nick
        };

        return ret;
    }
}