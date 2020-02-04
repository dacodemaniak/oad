import { IModule } from './../module-interface';
export class Route {
    private _path: string;
    private _module: IModule;
    private _canActivate: boolean;

    public constructor(path: string, module: any, canActivate: boolean = true) {
        this._path = path;
        this._module = module;
        this._canActivate = canActivate;
    }

    public get path(): string {
        return this._path;
    }

    public get module(): IModule {
        return this._module;
    }
}