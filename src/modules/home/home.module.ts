import { IModule } from '../../core/modules/module-interface';
import { SplashController } from './../splash/splash-controller';

export class HomeModule implements IModule {
    private controllers: any = {
        splash: new SplashController()
    };    
    
    public constructor(...args: any[]) {
        for(let controller in this.controllers) {
            this.controllers[controller].show();
        }
    }


}