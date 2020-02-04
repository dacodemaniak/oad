import { Controller } from './../../core/controller';

import * as $ from 'jquery';

import './../../scss/splash.scss';

export class SplashController extends Controller {
    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'splashScreen';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'splash';
    }
}