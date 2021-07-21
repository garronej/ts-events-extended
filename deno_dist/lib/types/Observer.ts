

export type Observer<Target> = {
    observe(target: Target): void;
    disconnect(): void;
};

export type ObserverCallback<Entry> = (entries: Entry[]) => void;

export type ObserverConstructor<Target, Entry> = {
    prototype: Observer<Target>;
    new(callback: ObserverCallback<Entry>): Observer<Target>;
};


