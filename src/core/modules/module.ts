import * as $ from 'jquery';

export abstract class Module {
    public constructor() {
        const docks: JQuery = $('[dock]');

        docks.children().remove();
    }
}