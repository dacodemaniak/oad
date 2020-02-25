import { Controller } from '../../../../core/controller';

import * as $ from 'jquery';

import './../../../../scss/splash.scss';

export class SwotController extends Controller {
    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'swot';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'swot';
    }
}