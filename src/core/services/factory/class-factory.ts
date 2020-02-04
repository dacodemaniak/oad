import { IService } from './../service-interface';
export class ClassFactory<T> {
    public getInstance(service: IService<T>, ...args: any[]): T {
        return new service(...args);
    }
}