import { HomeModule } from './modules/home/home.module';
import { Router } from './core/modules/router/router';
import { SplashController } from './modules/splash/splash-controller';
import { Loader } from './core/modules/loader/loader';
import { MenuController } from './modules/menu/menu-controller';
import * as $ from 'jquery';


import './scss/main.scss';
import { Route } from './core/modules/router/route';

/**
 * @author Laura Jannot - Feb 2020 - laura.jeannot@gmail.com
 * @version 1.0.0
 *  Main entry for OAD App
 */
export class Main {
    public constructor() {
        
        console.log('OAD app is running!');
        
        const loader: Loader = new Loader();
        loader.show();
        

        // Make a menu instance
        const mainMenu: MenuController = new MenuController();
        mainMenu.show();

        // Make a footer instance

        // Instanciate the router
        const router: Router = new Router();
        router.add(
            new Route('/', HomeModule)
        );

        loader.dismiss();
    }
}

/**
 * Application bootstraping
 */
$(document).ready(() => {
    const main: Main = new Main();
});
