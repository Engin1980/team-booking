export class ToDoException extends Error {
    constructor() {
        super("Not implemented yet. To do.");
    }
}

export function throwToDoException(): never {
    throw new ToDoException();
}