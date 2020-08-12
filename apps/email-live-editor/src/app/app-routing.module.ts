import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RouteParams} from './constants/route-params';
import {MagicValues} from './constants/magic-values';
import {RenderExampleComponent} from './render-example/render-example.component';

const routes = [
    {
        path: `render-example/:${RouteParams.templateId}/:${RouteParams.exampleId}`,
        pathMatch: 'full',
        component: RenderExampleComponent
    },
    {
        path: '**',
        redirectTo: `render-example/${MagicValues.MissingTemplateId}/${MagicValues.MissingExampleId}`

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
