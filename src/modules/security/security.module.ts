import { StatesController } from './controllers/states/states-controller';
import { BilanController } from './controllers/bilan/bilan';
import { ChartsController } from './controllers/charts/chart';
import { ToolbarController } from './controllers/toolbar/toolbar';
import { ProtectedSpacesController } from './controllers/protected-spaces/protected-spaces';
import { IModule } from '../../core/modules/module-interface';
import { Module } from '../../core/modules/module';
import { MenuController } from '../../shared/controllers/menu/menu-controller';
import { FooterController } from '../../shared/controllers/footer/footer-controller';


export class SecurityModule extends Module implements IModule {
    private controllers: any = {
        menu: new MenuController(),
        states: new StatesController(),
        footer: new FooterController(),
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