import { IModule } from './../module-interface';
import { ClassFactory } from './../../services/factory/class-factory';
import { IService } from '../../services/service-interface';
import * as $ from 'jquery';

import { Route } from './route';

export class Router {
    private routes: Map<string, Route>;

    public constructor() {
        this.routes = new Map<string, Route>();

        let router = this;

        // Définit le listener sur les routes
        $(window).on(
            'load hashchange',
            (event: any): void => router.getRoute(event)
        );
    }

    public add(route: Route): Router {
        this.routes.set(route.path, route);
        return this;
    }

    private getRoute(event: any): void {
        console.log('hash ' + location.hash);

        const url = location.hash.slice(1) || '/';

        console.log('URL à charger [' + url + ']');

        if (url !== '.') {
            // On va essayer de chercher si dans les routes, on a quelque chose qui correspond
            const route = this.routes.get(url);

            // Instance d'un contrôleur vide
            let module = {};
        
            if (!route) {
                module = new Error(); // 404 module...
            } else {
                // Charge le module concerné...
                const loader: ClassFactory<IModule> = new ClassFactory<IModule>();
                const module: IModule = loader.getInstance(<IService<IModule>> route.module);
            }
        } else {
            event.preventDefault();
        }

    }
}