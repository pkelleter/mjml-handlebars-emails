import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {CompileTemplateParams} from '../../../../../shared/interfaces/compile-template-params';
import {CompileTemplateResponse} from '../../../../../shared/interfaces/compile-template-response';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {ErrorMessages} from '../../constants/error-messages';

@Injectable({
    providedIn: 'root'
})
export class ATemplatesService {

    constructor(private httpClient: HttpClient,
                private domSanitizer: DomSanitizer) {
    }

    public compileTemplate$(id: string, values: CompileTemplateParams): Observable<SafeHtml> {
        return this.httpClient.post<CompileTemplateResponse>(`${environment.apiUrl}/templates/compile/${id}`, values).pipe(
            map(response => response.compiledTemplate),
            catchError(() => of(ErrorMessages.Unknown)),
            map(template => this.domSanitizer.bypassSecurityTrustHtml(template))
        );
    }

}
