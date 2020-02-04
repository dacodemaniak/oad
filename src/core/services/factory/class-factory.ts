import { IModule } from './../../modules/module-interface';
export class ClassFactory<T> {
    public getInstance(service: IModule<T>, ...args: any[]): T {
        return new service(...args);
    }
}