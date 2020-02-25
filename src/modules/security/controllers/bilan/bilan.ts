import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';
import 'bootstrap';

import './../../../../scss/bilan.scss';

export class BilanController extends Controller {

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'security';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'security-bilan';


        
    }
}