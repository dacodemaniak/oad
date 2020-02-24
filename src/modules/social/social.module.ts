import { ChartsController } from './controllers/charts/chart';
import { DensityController } from './controllers/density/density-controller';
import { IModule } from '../../core/modules/module-interface';
import { Module } from '../../core/modules/module';
import { MenuController } from '../../shared/controllers/menu/menu-controller';
import { FooterController } from '../../shared/controllers/footer/footer-controller';


export class SocialModule extends Module implements IModule {
    private controllers: any = {
        menu: new MenuController(),
        footer: new FooterController(),
        density: new DensityController(),
        charts: new ChartsController()
    };    
    
    public constructor(...args: any[]) {
        super();
        let promise: Promise<void>[] = [];

        for(let controller in this.controllers) {
            promise.push(this.controllers[controller].show());
        }

        const promises: any = Promise.all(promise).then(() => {});
    }


}