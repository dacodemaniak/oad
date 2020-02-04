export interface IModule<T> {
    new (...args: any[]): T;
}