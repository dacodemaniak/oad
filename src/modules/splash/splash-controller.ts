import { Controller } from './../../core/controller';

import * as $ from 'jquery';

import './../../scss/splash.scss';

export class SplashController extends Controller {
    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'homeIntro';

        const dock: JQuery = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);

        if (dock) {
            this.loadView('splash').then((view: JQuery) => {
                this.view = view;
                dock.append(this.view);
            });
        }
    }
}