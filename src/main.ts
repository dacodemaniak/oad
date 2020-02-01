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
        console.log('OAD app is running!');

        // Make a menu instance
        const mainMenu: MenuController = new MenuController();
    }
}

/**
 * Application bootstraping
 */
$(document).ready(() => {
    const main: Main = new Main();
});
