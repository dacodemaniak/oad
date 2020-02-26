import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';
import { GeoCenterInterface } from '../../../../core/services/leafLet/interfaces/geo-center.interface';
import { LeafletService } from '../../../../core/services/leafLet/leaflet-service';
import { ChartService } from '../../../../core/services/chart/chart.service';

import 'bootstrap';

import './../../../../scss/bilan.scss';
import './../../../../scss/map.scss';

export class StatesController extends Controller {
    private leafletG: LeafletService;
    private leafletC: LeafletService;
    private vulcanCr: LeafletService;
    private roadG: LeafletService;
    private roadCR: LeafletService;

    private crCriminalityGraph: ChartService = new ChartService();
    private gOrpaillage: ChartService = new ChartService();

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
        Controller.target = 'security';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'states';

        // Build leaflet layout for Guyana
        this.leafletG = new LeafletService('criminality-g');
        this.leafletG.setGeoCenter(this.geoCenterGuyana.lat, this.geoCenterGuyana.lng);
        this.leafletG.layerZoom = 7;
        this.leafletG.jsonFile = 'contour_dep-g';
        this.leafletG.setStyle({
            color: '#FECA01',
            weight: 2.5,
            fillColor: '#FECA01',
            fill0pacity: 1
        }).addPopup('<strong>Guyane</strong><br>Indice de criminalité : <strong>109,3</strong>');

        // Build leaflet layout for Costa Rica
        this.leafletC = new LeafletService('criminality-cr');
        this.leafletC.setGeoCenter(this.geoCenterCostaRica.lat, this.geoCenterCostaRica.lng);
        this.leafletC.layerZoom = 7;
        this.leafletC.jsonFile = 'contour_dep-c';
        this.leafletC.setStyle({
            color: '#DF0118',
            weight: 2.5,
            fillColor: '#DF0118',
            fill0pacity: 1
        }).addPopup('<strong>Costa Rica</strong><br>Indice de criminalité : <strong>56,33</strong>');

        // Build vulcans leaflet
        this.vulcanCr = new LeafletService('volcans-cr');
        this.vulcanCr.setGeoCenter(this.geoCenterCostaRica.lat, this.geoCenterCostaRica.lng);
        this.vulcanCr.layerZoom = 7;
        this.vulcanCr.jsonFile = 'volcan-cr';

        // Roads
        this.roadG = new LeafletService('road-g');
        this.roadG.setGeoCenter(this.geoCenterGuyana.lat, this.geoCenterGuyana.lng);
        this.roadG.layerZoom = 7;
        this.roadG.jsonFile = 'route-g';

        this.roadCR = new LeafletService('road-cr');
        this.roadCR.setGeoCenter(this.geoCenterCostaRica.lat, this.geoCenterCostaRica.lng);
        this.roadCR.layerZoom = 7;
        this.roadCR.jsonFile = 'route-cr';

        // Costa Rica criminality graph
        this.crCriminalityGraph.HTMLElement = 'cr-criminality-evolution';
        this.crCriminalityGraph
            .addLabel('1990')
            .addLabel('2000')
            .addLabel('2008')
            .addLabel('2010');
        this.crCriminalityGraph.addDataSet(
            {
                label: 'Costa Rica',
                data: [164, 249, 512, 527],
                backgroundColor: ['rgba(8, 244, 4, .8)']
            }
        );

        // Guyane chart
        this.gOrpaillage.HTMLElement = 'g-orpaillage';
        this.gOrpaillage
            .addLabel('2008')
            .addLabel('2009')
            .addLabel('2010')
            .addLabel('2011')
            .addLabel('2012')
            .addLabel('2013');
        this.gOrpaillage.addDataSet(
            {
                label: 'Orpaillages illégaux',
                data: [540, 600, 490, 400, 740, 790],
                backgroundColor: ['rgba(8, 244, 4, .8)']
            }
        );        
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {
                this.leafletG.show();
                this.leafletC.show();
                this.vulcanCr.show();

                this.roadG.show();
                this.roadCR.show();

                this.crCriminalityGraph.draw();
                this.gOrpaillage.draw();

                // Sets event handlers...
                this._setHandlers();

                resolve();
            })
        });
    }

    private _setHandlers(): void {
        $('#security').on(
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

        // Check if data-switch
        if (element.attr('data-switch') !== undefined) {
            console.log(`Have to switch to infography ${element.attr('data-switch')}`);

            // Hide all leaflets and show all infographies
            $('.leaflet').addClass('hidden');
            $('.infography').removeClass('hidden');

        } else {
            $('.infography').addClass('hidden');
            
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
    
            $('.leaflet').removeClass('hidden');

            this.leafletC.show();
            this.leafletG.show();
        }
    }
}