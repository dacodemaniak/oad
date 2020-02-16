import * as $ from 'jquery';
import * as Chart from 'chart.js';

export class ChartService {
    private _type: string = 'line';
    private readonly _context: string = '2d';
    private _HTMLId: string;
    private _HTMLElement: HTMLCanvasElement;
    private labels: Set<string>;
    private datasets: any[] = new Array<any>();
    private chartData: any = {};
    private chart: any;

    public constructor() {
        this.labels = new Set<string>();
        this.chartData.type = this._type;
    }

    public draw(): void {
        this._HTMLElement =  <HTMLCanvasElement> document.getElementById(this._HTMLId);

        const context: any = this._HTMLElement.getContext(this._context);

        this.chartData.data = [];
        this.chartData.data.datasets = [];

        this.chartData.data.labels = Array.from(this.labels);
        this.chartData.data.datasets = this.datasets;

        this.chart = new Chart(
            context,
            this.chartData
        );
    }

    public set type(type: string) {
        this.chartData.type = type;
    }

    public set HTMLElement(HTMLElement: string) {
        this._HTMLId = HTMLElement;
    }

    public addLabel(label: string): ChartService {
        this.labels.add(label);
        return this;
    }

    public addDataSet(dataset: any): ChartService {
        this.datasets.push(dataset);
        return this;
    }
} 