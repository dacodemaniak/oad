import { SplashController } from './modules/splash/splash-controller';
import { Loader } from './core/modules/loader/loader';
import { MenuController } from './modules/menu/menu-controller';
import * as $ from 'jquery';


import './scss/main.scss';

/**
 * @author Laura Jannot - Feb 2020 - laura.jeannot@gmail.com
 * @version 1.0.0
 *  Main entry for OAD App
 */
export class Main {
    public constructor() {
        const loader: Loader = new Loader();
        loader.show();
        console.log('OAD app is running!');

        // Make a menu instance
        const mainMenu: MenuController = new MenuController();

        // Load splash screen
        const splash: SplashController = new SplashController();
        
        loader.dismiss();
    }
}

/**
 * Application bootstraping
 */
$(document).ready(() => {
    const main: Main = new Main();
});
