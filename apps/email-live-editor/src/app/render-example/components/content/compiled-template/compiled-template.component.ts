import {Component, OnInit} from '@angular/core';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {ErrorMessages} from '../../../../constants/error-messages';
import {isEqual} from 'lodash-es';
import {ATemplatesService} from '../../../../services/templates/a-templates.service';
import {SafeHtml} from '@angular/platform-browser';
import {AExamplesService} from '../../../../services/examples/a-examples.service';
import {ActivatedRoute} from '@angular/router';
import {RouteParams} from '../../../../constants/route-params';
import {MagicValues} from '../../../../constants/magic-values';
import {TemplateExamples} from '../../../../../../../shared/interfaces/template-examples';
import {ExampleInstance} from '../../../../interfaces/example-instance';
import {APollingService} from '../../../../services/polling/a-polling.service';

@Component({
    selector: 'emails-compiled-template',
    templateUrl: './compiled-template.component.html',
    styleUrls: ['./compiled-template.component.scss']
})
export class CompiledTemplateComponent implements OnInit {

    public compiledTemplate$: Observable<SafeHtml>;

    constructor(private activatedRoute: ActivatedRoute,
                private aPollingService: APollingService,
                private aExamplesService: AExamplesService,
                private aTemplatesService: ATemplatesService) {
    }

    public ngOnInit(): void {
        this.defineStreams();
    }

    private defineStreams(): void {
        const templateId$ = this.activatedRoute.paramMap.pipe(
            map(paramMap => paramMap.get(RouteParams.templateId)),
            map(templateId => templateId ?? MagicValues.MissingTemplateId)
        );

        const exampleId$ = this.activatedRoute.paramMap.pipe(
            map(paramMap => paramMap.get(RouteParams.exampleId)),
            map(templateId => templateId ?? MagicValues.MissingExampleId)
        );

        this.compiledTemplate$ = combineLatest([
            templateId$,
            exampleId$,
            this.aExamplesService.examples$,
            this.aPollingService.polling$
        ]).pipe(
            map(([templateId, exampleId, examples, _]) => this.getExampleInstance(templateId, exampleId, examples)),
            switchMap(exampleInstance => exampleInstance
                ? this.aTemplatesService.compileTemplate$(exampleInstance.templateId, exampleInstance.instance)
                : of(ErrorMessages.Unknown)
            ),
            catchError(() => of(ErrorMessages.Unknown)),
            distinctUntilChanged((a, b) => isEqual(a, b))
        );
    }

    private getExampleInstance(templateId: string, exampleId: string, examples: TemplateExamples[]): ExampleInstance | undefined {
        const currentExample = examples.find(example => example.templateId === templateId);
        if (!currentExample) return;
        const instance = currentExample.instances.find(example => example.id === exampleId);
        if (!instance) return;
        return {templateId, instance};
    }
}
