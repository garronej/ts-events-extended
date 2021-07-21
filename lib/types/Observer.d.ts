export declare type Observer<Target> = {
    observe(target: Target): void;
    disconnect(): void;
};
export declare type ObserverCallback<Entry> = (entries: Entry[]) => void;
export declare type ObserverConstructor<Target, Entry> = {
    prototype: Observer<Target>;
    new (callback: ObserverCallback<Entry>): Observer<Target>;
};
