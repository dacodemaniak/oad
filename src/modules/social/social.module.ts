import { BilanController } from './/controllers/bilan/bilan';
import { ChartsController } from './controllers/charts/chart';
import { DensityController } from './controllers/density/density-controller';
import { IModule } from '../../core/modules/module-interface';
import { Module } from '../../core/modules/module';
import { MenuController } from '../../shared/controllers/menu/menu-controller';
import { FooterController } from '../../shared/controllers/footer/footer-controller';

import './../../scss/main.scss';

export class SocialModule extends Module implements IModule {
    private controllers: any = {
        density: new DensityController(),
        menu: new MenuController(),
        charts: new ChartsController(),
        bilan: new BilanController(),
        footer: new FooterController(),
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