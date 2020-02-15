import { IntroController } from './controllers/intro/intro-controller';
import { TimelineController } from './controllers/timeline/timeline-controller';
import { IModule } from '../../core/modules/module-interface';
import { SplashController } from './controllers/splash/splash-controller';
import { MenuController } from './../../shared/controllers/menu/menu-controller';
import { FooterController } from './../../shared/controllers/footer/footer-controller';
import { Module } from './../../core/modules/module';

export class HomeModule extends Module implements IModule {
    private controllers: any = {
        menu: new MenuController(),
        footer: new FooterController(),
        splash: new SplashController(),
        intro: new IntroController(),
        timeline: new TimelineController(),
    };    
    
    public constructor(...args: any[]) {
        super();
        
        for(let controller in this.controllers) {
            this.controllers[controller].show();
        }
    }


}