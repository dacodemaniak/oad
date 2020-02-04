export interface IService<T> {
    new (...args: any[]): T;
}