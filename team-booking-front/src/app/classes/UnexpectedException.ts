export class UnexpectedException extends Error{

}

export function throwUnexpectedException():never{
    throw new UnexpectedException();
}