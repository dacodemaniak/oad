import { ChartService } from './../../../../core/services/chart/chart.service';

import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';
import 'bootstrap';

import './../../../../scss/chart.scss';

export class ChartsController extends Controller {
    private gGraph: ChartService = new ChartService();
    private pibGuyane: ChartService = new ChartService();
    private pibCostaRica: ChartService = new ChartService();

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'social';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'social-charts';

        // Sets oiGraph chart
        this.gGraph.type = 'line';
        this.gGraph.HTMLElement = 'population-evolution-density';
        this.gGraph
            .addLabel('1990')
            .addLabel('2000')
            .addLabel('2005')
            .addLabel('2010')
            .addLabel('2015')
            .addLabel('2018')
            .addLabel('2019');
        this.gGraph.addDataSet(
            {
                label: 'Guyane',
                data: [114730, 157213, 191000, 237549, 259865, 281612, 296711],
                backgroundColor: ['rgba(8, 244, 4, .8)']
            }
        ).addDataSet(
            {
                label: 'Costa Rica',
                backgroundColor: ['rgba(4, 99, 244, .8)'],
                data: [3000096, 3000925, 4000248, 4000545, 4000806, 4000906],
            }
        );

        // Sets PIB charts
        this.pibGuyane.HTMLElement = 'pib-guyane';
        this.pibGuyane.type = 'line';
        this.pibGuyane
            .addLabel('2014')
            .addLabel('2015')
            .addLabel('2016')
            .addLabel('2017')
            .addLabel('2018')
            .addLabel('2019')
            ;
        this.pibGuyane.addDataSet(
            {
                label: 'Guyane',
                backgroundColor: 'rgba(8, 244, 4, .8)',
                data: [
                    4028, 4168, 4531, 4635, 4984, 5252
                ]
            }
        );

        this.pibCostaRica.HTMLElement = 'pib-costa-rica';
        this.pibCostaRica.type = 'line';
        this.pibCostaRica
            .addLabel('2014')
            .addLabel('2015')
            .addLabel('2016')
            .addLabel('2017')
            .addLabel('2018')
            .addLabel('2019')
            ;
        this.pibCostaRica.addDataSet(
            {
                label: 'Costa Rica',
                backgroundColor: 'rgba(4, 99, 244, .8)',
                data: [
                    3.32, 3.63, 4.25, 3.40, 2.66, 3.35
                ]
            }
        );
        
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {
                this.gGraph.draw();
                this.pibGuyane.draw();
                this.pibCostaRica.draw();
                console.log('Resolving charts');
                resolve();
            })
        });
    }
}