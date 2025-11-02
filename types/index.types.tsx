export type VoidFunction = () => void;
export type SetterBoolean<T> = (params: T) => boolean;
export type SetterState<T> = (state: T) => void;
export type AsycnVoidFunction = () => Promise<void>;
export type AsyncFunction<T> = () => Promise<T>;
