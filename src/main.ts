import { SecurityModule } from './modules/security/security.module';
import { HomeModule } from './modules/home/home.module';
import { SocialModule } from './modules/social/social.module';
import { Router } from './core/modules/router/router';
import { SplashController } from './modules/home/controllers/splash/splash-controller';
import { Loader } from './core/modules/loader/loader';
import * as $ from 'jquery';


import './scss/main.scss';
import { Route } from './core/modules/router/route';
import { EnvironmentModule } from './modules/environment/environment.module';
import { TourismModule } from './modules/tourism/tourism.module';
import { BilanModule } from './modules/bilan/bilan.module';

/**
 * @author Laura Jannot - Feb 2020 - laura.jeannot@gmail.com
 * @version 1.0.0
 *  Main entry for OAD App
 */
export class Main {
    private controllers: any = {
    };

    public constructor(event: any) {
        
        console.log('OAD app is running!');
        
        const loader: Loader = new Loader();
        loader.show();
        
        for (let controller in this.controllers) {
            this.controllers[controller].show();
        }
        console.log('Sets routes and load current route');
        
        // Instanciate the router
        const router: Router = new Router();
        router
            .add(
                new Route('/', HomeModule)
            )
            .add(
                new Route('environnement', EnvironmentModule)
            )
            .add(
                new Route('social', SocialModule)
            )
            .add(
                new Route('security', SecurityModule)
            )
            .add(
                new Route('tourism', TourismModule)
            )
            .add(
                new Route('bilan', BilanModule)
            ).getRoute(event);

        loader.dismiss();
    }
}

/**
 * Application bootstraping
 */
$(document).ready((event: any) => {
    const main: Main = new Main(event);
});
