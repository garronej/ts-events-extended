

export class TimeoutEvtError extends Error {
    constructor(public readonly timeout: number) {
        super(`Evt timeout after ${timeout}ms`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class DetachedEvtError extends Error {
    constructor() {
        super(`Evt handler detached`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}



