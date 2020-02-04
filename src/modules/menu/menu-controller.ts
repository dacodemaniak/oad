import * as $ from 'jquery';

import { Controller } from './../../core/controller';

export class MenuController extends Controller {

    public constructor() {
        super();

        MenuController.rel = 'menu';
        MenuController.target = 'mainNavMenu';

        this.dock = $(`[data-rel="${MenuController.rel}"][data-target="${MenuController.target}"]`);
        this.viewSrc = 'main-menu';
    }
    
}