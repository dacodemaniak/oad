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

    private popup: any;

    private style: any = {
        color: '#000', weight: 2.5, fillColor: '#000', fill0pacity: 1
    };

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

    public setStyle(style: any): LeafletService {
        this.style = style;
        return this;
    }

    public addPopup(content: string): LeafletService {
        console.log('Add a popup');
        this.popup = {};
        this.popup.content = content;
        this.popup.geoCenter = this.geoCenter;

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
                        style: (feature: any): any => {
                            console.log(`Apply ${JSON.stringify(this.style)}`);
                            return this.style
                        },
                        onEachFeature: (feature: Feature<Geometry, any>, layer: L.Layer): void => {

                        },
                    }
                );
                // Add the brand new layer
                this.map.addLayer(this.layer);

                if (this.popup !== undefined) {
                    let popup: any = new L.Popup()
                        .setLatLng([this.popup.geoCenter.lat, this.popup.geoCenter.lng])
                        .setContent(this.popup.content)
                        .openOn(this.map);
                }
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