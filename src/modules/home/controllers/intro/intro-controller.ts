import * as $ from 'jquery';

import { Controller } from './../../../../core/controller';
import './../../../../scss/intro.scss';

export class IntroController extends Controller {
    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'intro';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'intro';
    }
}