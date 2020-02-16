import { GeoCenterInterface } from './interfaces/geo-center.interface';
import { 
    URL_TEMPLATE,
    ATTRIBUTION 
} from './constants/constants';

import * as $ from 'jquery';
import * as L from 'leaflet';
import { Feature, Geometry } from 'geojson';

export class LeafletService {
    private HTMLMapElement: string;

    private map: L.Map;
    private layer: L.Layer;

    private geoCenter: GeoCenterInterface = {};
    private _layerZoom: number = 7;

    private _jsonFile: string;

    public constructor(HTMLMapElement: string) {
        this.HTMLMapElement = HTMLMapElement;
    }

    public set jsonFile(jsonFile: string) {
        this._jsonFile = `./assets/geojson/${jsonFile}.geojson`;
    }

    public setGeoCenter(lat: number, lng: number): LeafletService {
        this.geoCenter.lat = lat;
        this.geoCenter.lng = lng;

        return this;
    }

    public show(): void {
        this._create();

        // Load json and map it
        $.getJSON(
            this._jsonFile,
            (geoData) => {
                this.layer = new L.GeoJSON(
                    geoData,
                    {
                        style: (feature: any): any => {},
                        onEachFeature: (feature: Feature<Geometry, any>, layer: L.Layer): void => {

                        },
                    }
                );
                // Add the brand new layer
                this.map.addLayer(this.layer);
            }
        )
    }

    public removeLayer(): void {
        this.map.removeLayer(this.layer);
        this.map.off();
        this.map.remove();
        
        $('#' + this.HTMLMapElement).children().remove();
    }

    public set layerZoom(zoom: number) {
        this._layerZoom = zoom;
    }

    private _create(): void {
        console.log(`Create with center on : ${this.geoCenter.lat} / ${this.geoCenter.lng} and ${this._layerZoom} factor`);
        this.map = new L.Map(
            this.HTMLMapElement
        ).setView(
            [
                this.geoCenter.lat, 
                this.geoCenter.lng
            ],
            this._layerZoom
        );

        const tileLayer: any = new L.TileLayer(
            URL_TEMPLATE,
            {
                maxZoom: 19,
                attribution: ATTRIBUTION
            }
        );
        tileLayer.addTo(this.map);
    }
}