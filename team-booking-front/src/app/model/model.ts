export interface Team{
    teamId : number;
    title : string;
}

export interface User{
    userId : number;
    email : string;
    nick : string;
    passwordHash : BinaryData;
}

export interface UserTeam{
    userTeamId : number;
    userId : number;
    teamid : number;
    isAdmin : boolean;
}

export interface Event{
    eventId : number;
    title : string;
    date : Date;
}

export interface UserEvent{
    userEventId : number;
    userId : number;
    eventId : number;
    groupId : string;
}

export interface Comment{
    commentId : number;
    text : string;
    userId : number;
    eventId : number;
}