import * as $ from 'jquery';
import path from 'path';

export abstract class Controller {
    protected view: JQuery;
    
    protected static rel: String;
    protected static target: String;

    public constructor(...args: any[]) {}

    protected loadView(file?: string): Promise<JQuery<HTMLElement>> {

        return new Promise<JQuery<HTMLElement>>((resolve) => {
            let filePath: string;

            if (!file) {
                path.resolve
                filePath = './assets/views/menu.view.html';
            } else {
                filePath = `./assets/views/${file}.view.html`;
            }

            $.get(
                filePath,
                (viewContent: string): void => {
                    resolve($(viewContent));
                }
            )
        });
    }
}