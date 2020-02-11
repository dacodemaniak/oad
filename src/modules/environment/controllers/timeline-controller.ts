import { Controller } from './../../../core/controller';

import * as $ from 'jquery';

import './../../../scss/timeliner.scss';

export class TimelineController extends Controller {
    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'timeline';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'timeline';
    }
}