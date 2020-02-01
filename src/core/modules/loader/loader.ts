import * as $ from 'jquery';

import './../../../scss/loader.scss';

export class Loader {
    private static readonly loader: string = './assets/images/loader.gif';
    private element: JQuery;

    public constructor() {
        this._makeLoader();
    }

    public show(): void {
        this.element.appendTo('body');
    }

    public dismiss(): void {
        setTimeout(
            () => { this.element.remove(); },
            300
        );
        
    }

    private _makeLoader(): void {
        const outerDiv: JQuery = $('<div>');
        const innerDiv: JQuery = $('<div>');
        const image: JQuery = $('<img>');

        // Apply classes and ids
        outerDiv
            .attr('id', 'loader')
            .addClass('outer-loader');
        innerDiv
            .addClass('inner-loader');
        
        image
            .attr('src', Loader.loader);

        // Store the structure
        outerDiv.append(innerDiv.append(image));

        this.element = outerDiv;
    }
}