import * as $ from 'jquery';
import path from 'path';

export abstract class Controller {
    protected view: JQuery;
    protected viewSrc: string;

    protected static rel: String;
    protected static target: String;

    protected dock: JQuery;


    public constructor(...args: any[]) {}

    public show(): void {
        if (this.dock) {
            this.loadView(this.viewSrc).then((view: JQuery) => {
                this.view = view;
                this.dock.append(this.view);
            });
        }
    }

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