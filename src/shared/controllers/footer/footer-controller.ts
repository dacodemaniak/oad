import * as $ from 'jquery';

import { Controller } from '../../../core/controller';

import './../../../scss/menu.scss';

export class FooterController extends Controller {

    public constructor() {
        super();

        Controller.rel = 'footer';
        Controller.target = 'mainFooter';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'main-footer';
    }
    
}