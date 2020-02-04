import { IModule } from './../../core/modules/module-interface';
import { SplashController } from './../splash/splash-controller';

export class HomeModule {
    public constructor(...args: any[]) {}

    private controllers: any = {
        SplashController
    };
}