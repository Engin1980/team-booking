export class UnexpectedException extends Error {
    constructor(message?: string) {
        super(UnexpectedException.convertMessageToString(message));
    }

    private static convertMessageToString(message?: string | null): string {
        if (message == undefined)
            return "Unexpected application state.";
        else
            return "Unexpected application state: " + message;
    }
}

export function throwUnexpectedException(message? : string): never {
    throw new UnexpectedException(message);
}