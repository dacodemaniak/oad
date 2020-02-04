export class Route {
    private _path: string;
    private _module: any;
    private _canActivate: boolean;

    public constructor(path: string, module: any, canActivate: boolean = true) {
        this._path = path;
        this._module = module;
        this._canActivate = canActivate;
    }

    public get path(): string {
        return this._path;
    }

    public get module(): any {
        return this._module;
    }
}