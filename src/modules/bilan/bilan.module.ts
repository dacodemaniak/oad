import { IntroController } from './controllers/intro/intro-controller';
import { IModule } from '../../core/modules/module-interface';
import { SwotController } from './controllers/swot/swot-controller';
import { MenuController } from '../../shared/controllers/menu/menu-controller';
import { FooterController } from '../../shared/controllers/footer/footer-controller';
import { Module } from '../../core/modules/module';

export class BilanModule extends Module implements IModule {
    private controllers: any = {
        menu: new MenuController(),
        footer: new FooterController(),
        swot: new SwotController(),
        intro: new IntroController(),
    };    
    
    public constructor(...args: any[]) {
        super();
        
        for(let controller in this.controllers) {
            this.controllers[controller].show();
        }
    }


}