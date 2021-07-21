export interface Person {
    name: string;
    age: number;
    [prom: string]: any;
}
export interface TypedPerson extends Person {
    sex: "male" | "female";
}
export declare function isTyped(p: Person): p is TypedPerson;
export declare class TypedPersonIntro {
    private intro;
    introduce(tp: TypedPerson): void;
}
