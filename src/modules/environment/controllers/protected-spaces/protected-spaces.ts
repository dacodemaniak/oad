
import * as $ from 'jquery';

import { Controller } from './../../../../core/controller';
import { LeafletService } from './../../../../core/services/leafLet/leaflet-service';

import './../../../../scss/map.scss';

export class ProtectedSpacesController extends Controller {
    private leafletService: LeafletService;

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'environment';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'protected-spaces';

        // Build leaflet layout
        this.leafletService = new LeafletService('protected-spaces');
        this.leafletService.setGeoCenter(3.996, -54.061);
        this.leafletService.layerZoom = 7;
        this.leafletService.jsonFile = 'limites_admin_guyane';
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {
                this.leafletService.show(); 
                resolve();
            })
        });
    }
}