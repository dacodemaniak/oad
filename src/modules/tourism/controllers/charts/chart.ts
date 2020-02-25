import { ChartService } from '../../../../core/services/chart/chart.service';

import * as $ from 'jquery';

import { Controller } from '../../../../core/controller';
import 'bootstrap';

import './../../../../scss/chart.scss';

export class ChartsController extends Controller {
    private oiGraph: ChartService = new ChartService();
    private radarChart: ChartService = new ChartService();

    public constructor() {
        super();

        Controller.rel = 'content';
        Controller.target = 'environment';

        this.dock = $(`[data-rel="${Controller.rel}"][data-target="${Controller.target}"]`);
        this.viewSrc = 'charts';

        // Sets oiGraph chart
        this.oiGraph.HTMLElement = 'chantiers-orpaillage-illegal';
        this.oiGraph
            .addLabel('Plantes et Fleurs')
            .addLabel('Arbres')
            .addLabel('Poissons')
            .addLabel('Oiseaux')
            .addLabel('Reptiles')
            .addLabel('Amphibiens')
            .addLabel('Mammifères');
        this.oiGraph.addDataSet(
            {
                label: 'Guyane',
                data: [5000, 1200, 500, 700, 160, 65, 180],
                backgroundColor: ['rgba(8, 244, 4, .8)']
            }
        ).addDataSet(
            {
                label: 'Costa Rica',
                data: [10000, 1800, 600, 870, 220, 160, 231],
                backgroundColor: ['rgba(4, 99, 244, .8)']
            }            
        );

        // Sets radar chart
        this.radarChart.HTMLElement = 'radar-chart';
        this.radarChart.type = 'radar';
        this.radarChart
            .addLabel('% du territoire d\'espace protégé')
            .addLabel('La chasse')
            .addLabel('L\'orpaillage')
            .addLabel('% du territoire touché par la déforestation');
        this.radarChart.addDataSet(
            {
                label: 'Guyane',
                backgroundColor: 'rgba(8, 244, 4, .8)',
                data: [
                    5, 0, 0, -1
                ]
            }
        )
        .addDataSet(
            {
                backgroundColor: 'rgba(4, 99, 244, .8)',
                label: 'Costa Rica',
                data: [
                    3, 5, 5, -1
                ]
            }            
        );
        
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve) => {
            super.show().then(() => {
                this.oiGraph.draw();
                this.radarChart.draw();
                resolve();
            })
        });
    }
}