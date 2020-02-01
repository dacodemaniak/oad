import * as $ from 'jquery';

import { Controller } from './../../core/controller';

export class MenuController extends Controller {

    public constructor() {
        super();

        MenuController.rel = 'menu';
        MenuController.target = 'mainNavMenu';

        const dock: JQuery = $(`[data-rel="${MenuController.rel}"][data-target="${MenuController.target}"]`);

        if (dock) {
            this.loadView('main-menu').then((view: JQuery) => {
                this.view = view;
                dock.append(this.view);
            });
        }

    }
    
}