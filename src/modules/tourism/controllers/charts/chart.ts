import { ChartService } from '../../../../core/services/chart/chart.service';

import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';
import 'bootstrap';

import './../../../../scss/chart.scss';

export class ChartsController extends Controller {
    private tourismGraph: ChartService = new ChartService();

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'tourism';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'tourism-chart';

        // Sets oiGraph chart
        this.tourismGraph.HTMLElement = 'tourism--entrance';
        this.tourismGraph
            .addLabel('1990')
            .addLabel('2000')
            .addLabel('2005')
            .addLabel('2010')
            .addLabel('2015')
            .addLabel('2018');
        this.tourismGraph.addDataSet(
            {
                label: 'Guyane',
                data: [76000, 105000, 117000, 152000, 198000, 247105],
                backgroundColor: ['rgba(8, 244, 4, .8)']
            }
        ).addDataSet(
            {
                label: 'Costa Rica',
                data: [435000, 1088000, 1679000, 2100000, 2660000, 2960000],
                backgroundColor: ['rgba(4, 99, 244, .8)']
            }            
        );
        
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {
                this.tourismGraph.draw();
                resolve();
            })
        });
    }
}