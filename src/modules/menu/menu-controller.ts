import * as $ from 'jquery';

import { Controller } from './../../core/controller';

import './../../scss/menu.scss';

export class MenuController extends Controller {

    public constructor() {
        super();

        MenuController.rel = 'menu';
        MenuController.target = 'mainNavMenu';

        this.dock = $(`[data-rel="${MenuController.rel}"][data-target="${MenuController.target}"]`);
        this.viewSrc = 'main-menu';
    }
    
}