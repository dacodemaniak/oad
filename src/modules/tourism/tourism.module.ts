import { BilanController } from './controllers/bilan/bilan';
import { ChartsController } from './controllers/charts/chart';
import { ToolbarController } from './controllers/toolbar/toolbar';
import { ProtectedSpacesController } from './controllers/protected-spaces/protected-spaces';
import { IModule } from '../../core/modules/module-interface';
import { Module } from '../../core/modules/module';
import { MenuController } from '../../shared/controllers/menu/menu-controller';
import { FooterController } from '../../shared/controllers/footer/footer-controller';


export class TourismModule extends Module implements IModule {
    private controllers: any = {
        menu: new MenuController(),
        footer: new FooterController(),
        toolbar: new ToolbarController(),
        protectedSpaces: new ProtectedSpacesController(),
        charts: new ChartsController(),
        bilan: new BilanController()
        
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