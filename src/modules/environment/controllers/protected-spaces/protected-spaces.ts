import { GeoCenterInterface } from './../../../../core/services/leafLet/interfaces/geo-center.interface';

import * as $ from 'jquery';

import { Controller } from './../../../../core/controller';
import { LeafletService } from './../../../../core/services/leafLet/leaflet-service';

import './../../../../scss/map.scss';

export class ProtectedSpacesController extends Controller {
    private leafletG: LeafletService;
    private leafletC: LeafletService;

    private readonly geoCenterGuyana: GeoCenterInterface = {
        lat: 3.996,
        lng: -54.061
    };

    private readonly geoCenterCostaRica: GeoCenterInterface = {
        lat: 9.752,
        lng: -84.165
    };

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'environment';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'protected-spaces';

        // Build leaflet layout for Guyana
        this.leafletG = new LeafletService('g-layout');
        this.leafletG.setGeoCenter(this.geoCenterGuyana.lat, this.geoCenterGuyana.lng);
        this.leafletG.layerZoom = 7;
        this.leafletG.jsonFile = 'contour_dep-g';

        // Build leaflet layout for Costa Rica
        this.leafletC = new LeafletService('c-layout');
        this.leafletC.setGeoCenter(this.geoCenterCostaRica.lat, this.geoCenterCostaRica.lng);
        this.leafletC.layerZoom = 7;
        this.leafletC.jsonFile = 'contour_dep-c';


    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {
                this.leafletG.show();
                this.leafletC.show();

                // Sets event handlers...
                this._setHandlers();

                resolve();
            })
        });
    }

    private _setHandlers(): void {
        $('#environment').on(
            'click',
            '.dropdown-item',
            (event: any): void => {
                this._loadLayer(event)
            }
        );
    }

    private _loadLayer(event: any): void {
        console.log('Loading layers');

        const element: JQuery = $(event.target);

        // Change span title
        $('span.title').html(element.attr('data-title'));

        const geoFileRoot: string = element.attr('data-rel');

        this.leafletC.removeLayer();
        this.leafletG.removeLayer();

        // Sets and loads new layers
        this.leafletC = new LeafletService('c-layout');
        this.leafletC.setGeoCenter(this.geoCenterCostaRica.lat, this.geoCenterCostaRica.lng);

        this.leafletG = new LeafletService('g-layout');
        this.leafletG.setGeoCenter(this.geoCenterGuyana.lat, this.geoCenterGuyana.lng);

        this.leafletC.jsonFile = `${geoFileRoot}c`;
        this.leafletG.jsonFile = `${geoFileRoot}g`;

        this.leafletC.show();
        this.leafletG.show();

    }
}