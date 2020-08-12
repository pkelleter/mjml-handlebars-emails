import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TemplateExamples} from '../../../../../shared/interfaces/template-examples';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, distinctUntilChanged, publishReplay, refCount, switchMap} from 'rxjs/operators';
import {isEqual} from 'lodash-es';
import {APollingService} from '../polling/a-polling.service';

@Injectable({
    providedIn: 'root'
})
export class AExamplesService {

    public examples$: Observable<TemplateExamples[]>;

    constructor(private aPollingService: APollingService,
                private httpClient: HttpClient) {
        this.defineStreams();
    }

    private defineStreams(): void {
        this.examples$ = this.aPollingService.polling$.pipe(
            switchMap(() => this.httpClient.get<TemplateExamples[]>(`${environment.apiUrl}/templates/examples`)),
            catchError(() => of([])),
            distinctUntilChanged((a, b) => isEqual(a, b)),
            publishReplay(1),
            refCount()
        );
    }

}
