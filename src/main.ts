
import { Router } from './core/modules/router/router';
import { SplashController } from './modules/home/controllers/splash/splash-controller';
import { Loader } from './core/modules/loader/loader';
import * as $ from 'jquery';


import './scss/main.scss';
import { Route } from './core/modules/router/route';


/**
 * @author Laura Jannot - Feb 2020 - laura.jeannot@gmail.com
 * @version 1.0.0
 *  Main entry for OAD App
 */

 const router: Router = new Router();

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
        
 

        loader.dismiss();
    }
}

/**
 * Application bootstraping
 */
$(document).ready((event: any) => {
    const main: Main = new Main(event);
});
