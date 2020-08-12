import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AExamplesService} from '../../../../services/examples/a-examples.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteParams} from '../../../../constants/route-params';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {MagicValues} from '../../../../constants/magic-values';

@Component({
    selector: 'emails-examples-tab',
    templateUrl: './examples-tab.component.html',
    styleUrls: ['./examples-tab.component.scss']
})
export class ExamplesTabComponent implements OnInit {

    public exampleIds$: Observable<string[]>;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private aExamplesService: AExamplesService) {
    }

    public ngOnInit(): void {
        this.defineStreams();
    }

    public selectExampleById(event: MatTabChangeEvent): Promise<boolean> {
        const exampleId = event.tab?.textLabel;
        if (!exampleId) return of(false).toPromise();
        return this.router.navigate([
            'render-example',
            this.activatedRoute.snapshot.paramMap.get(RouteParams.templateId),
            exampleId
        ]);
    }

    private defineStreams(): void {
        const templateId$ = this.activatedRoute.paramMap.pipe(
            map(paramMap => paramMap.get(RouteParams.templateId)),
            map(templateId => templateId ?? MagicValues.MissingTemplateId)
        );

        this.exampleIds$ = combineLatest([
            templateId$,
            this.aExamplesService.examples$
        ]).pipe(
            map(([templateId, examples]) => examples.find(example => example.templateId === templateId)),
            map(example => example ? example.instances.map(instance => instance.id) : [])
        );
    }
}
