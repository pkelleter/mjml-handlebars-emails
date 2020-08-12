import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, ReplaySubject} from 'rxjs';
import {AExamplesService} from '../../../../services/examples/a-examples.service';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MagicValues} from '../../../../constants/magic-values';
import {RouteParams} from '../../../../constants/route-params';

@Component({
    selector: 'emails-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {

    public templateIds$: Observable<string[]>;
    public selectedTemplateId: string;

    private destroySubject = new ReplaySubject<boolean>(1);

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private aExamplesService: AExamplesService) {
    }

    public ngOnInit(): void {
        this.defineStreams();
        this.preselectTemplateIdByUrl();
    }

    public ngOnDestroy(): void {
        this.destroySubject.next(true);
        this.destroySubject.complete();
    }

    public selectTemplateById(templateId: string): Promise<boolean> {
        const newTemplateId = templateId ?? MagicValues.MissingTemplateId;
        return this.aExamplesService.examples$.pipe(
            take(1),
            map(examples => examples.find(example => example.templateId === newTemplateId)),
            map(example => example?.instances?.[0] ? example.instances[0].id : MagicValues.MissingExampleId),
            switchMap((instanceId) => this.router.navigate(['render-example', newTemplateId, instanceId]))
        ).toPromise();
    }

    private defineStreams(): void {
        this.templateIds$ = this.aExamplesService.examples$.pipe(
            map(examples => examples.map(example => example.templateId))
        );
    }

    private preselectTemplateIdByUrl(): void {
        const routeTemplateId$ = this.activatedRoute.paramMap.pipe(
            map(paramMap => paramMap.get(RouteParams.templateId)),
            map(templateId => templateId ?? MagicValues.MissingTemplateId)
        );

        combineLatest([
            this.templateIds$,
            routeTemplateId$
        ]).pipe(
            take(1),
            tap(([templateIds, routeTemplateId]) => {
                if (!templateIds.length || templateIds.includes(routeTemplateId)) return;
                this.selectTemplateById(templateIds[0] ?? MagicValues.MissingTemplateId)
                    .then(() => window.location.reload());
            }),
            map(([_, routeTemplateId]) => routeTemplateId)
        ).subscribe((selectedTemplateId) => this.selectedTemplateId = selectedTemplateId);
    }

}
