
import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';
import 'bootstrap';

import './../../../../scss/map.scss';

export class ToolbarController extends Controller {

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'environment';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'environment-loader';
    }
}