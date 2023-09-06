export class UnexpectedException extends Error {
    constructor() {
        super("Unexpected application state.");
    }
}

export function throwUnexpectedException(): never {
    throw new UnexpectedException();
}