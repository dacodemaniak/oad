import { GeoCenterInterface } from '../../../../core/services/leafLet/interfaces/geo-center.interface';

import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';

import './../../../../scss/map.scss';

export class DensityController extends Controller {

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'social';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'social';
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {

                // Animate SVG from JSON datas
                this._animateSVG();
                
                // Sets event handlers...
                this._setHandlers();

                resolve();
            })
        });
    }

    private _animateSVG() {
        const jsonFile: string = './assets/geojson/density-guyane.json';

        let jsonDatas: any[] = [];

        $.get(jsonFile, (datas) => {
            datas.forEach((data: any, index: number) => {
                // Push datas
                jsonDatas.push([
                    data.numerpic,
                    data.population,
                    data.nom
                ]);

                // Get the ID of area
                const areaId: JQuery = $('#' + data.numerpic);

                // Load animations over areaId according population number
                if (data.population < 6000) {
                    this._fill(areaId, jsonDatas, '#d3e8d9');
                }
                if (data.population > 6001 && data.population < 40000) {
                    this._fill(areaId, jsonDatas, '#93e6a9');
                }
                if (data.population > 40001 && data.population < 80000) {
                    this._fill(areaId, jsonDatas, '#48a160');
                }
                if (data.population > 80001 && data.population < 90000) {
                    this._fill(areaId, jsonDatas, '#5eeb7c');
                }
                if (data.population > 90001) {
                    this._fill(areaId, jsonDatas, '#3e854e');
                }                     
            })
        });
    }

    private _fill(areaId: JQuery, jsonDatas: any[], color: string): void {
        areaId
            .css('fill', color)
            .on(
                'mouseover',
                (event: any): void => {
                    jsonDatas.forEach((data: any[], index: number) => {
                        const area: JQuery = $(event.target);
                        if (area.attr('id') == data[0]) {
                            console.log('Build "Fiche" ' + data[0] + ' <=> ' + area.attr('id'));
                            area.css('fill', 'white');
                            // Displays "fiche"
                            $('#fiche')
                                .empty()
                                .append(`Nom de l'EPCI ${data[2]}<br>Nombre d'habitants : ${data[1]}`);
                        }
                    })
                }
            )
            .on(
                'mouseleave',
                (event: any): void => {
                    const area: JQuery = $(event.target);
                    area.css('fill', color);
                    $('#fiche').empty();  
                }
            );
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

        // Check if data-switch
        if (element.attr('data-switch') !== undefined) {
            console.log(`Have to switch to infography ${element.attr('data-switch')}`);

            // Hide all leaflets and show all infographies
            $('.leaflet').addClass('hidden');
            $('.infography').removeClass('hidden');

        } else {
            $('.infography').addClass('hidden');
            
            const geoFileRoot: string = element.attr('data-rel');
    
            // Sets and loads new layers
    
            $('.leaflet').removeClass('hidden');
        }
    }
}