export class ToDoException extends Error{

}

export function throwToDoException():never{
    throw new ToDoException();
}