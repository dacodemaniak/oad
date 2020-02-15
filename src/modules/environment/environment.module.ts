import { ProtectedSpacesController } from './controllers/protected-spaces/protected-spaces';
import { IModule } from '../../core/modules/module-interface';
import { Module } from './../../core/modules/module';
import { MenuController } from './../../shared/controllers/menu/menu-controller';
import { FooterController } from './../../shared/controllers/footer/footer-controller';


export class EnvironmentModule extends Module implements IModule {
    private controllers: any = {
        menu: new MenuController(),
        footer: new FooterController(),
        protectedSpaces: new ProtectedSpacesController()
    };    
    
    public constructor(...args: any[]) {
        super();
        
        for(let controller in this.controllers) {
            this.controllers[controller].show();
        }
    }


}