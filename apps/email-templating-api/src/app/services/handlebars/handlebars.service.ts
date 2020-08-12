import {Injectable} from '@nestjs/common';
import {of, ReplaySubject} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {TemplatesService} from '../templates/templates.service';
import {PathsService} from '../paths/paths.service';
import {environment} from '../../../environments/environment';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class HandlebarsService {

    private isPartialsLoaded$ = new ReplaySubject<boolean>(1);

    constructor(private templatesService: TemplatesService,
                private pathsService: PathsService) {
        if (environment.production) this.updatePartials().then(() => void 0);
    }

    public async compileTemplate(template: string): Promise<HandlebarsTemplateDelegate<any>> {
        const compileOptions = {compat: true, strict: true};
        if (!environment.production) await this.updatePartials(); // no cache for dev
        return this.isPartialsLoaded$.pipe(
            filter(Boolean),
            take(1),
            switchMap(() => of(handlebars.compile(template, compileOptions)))
        ).toPromise();
    }

    public async updatePartials(): Promise<void> {
        this.isPartialsLoaded$.next(false);
        const basePathLength = this.normalizePath(this.pathsService.templatesRoot).length;
        const partialPaths = await this.templatesService.getPartialPaths();
        for await (const partialPath of partialPaths) {
            const partialKey = this.normalizePath(partialPath).slice(basePathLength + 1);
            await fs.promises.readFile(partialPath, 'utf-8').then(
                (template: string) => handlebars.registerPartial(partialKey, template)
            );
        }
        this.isPartialsLoaded$.next(true);
    }

    private normalizePath(p: string): string {
        return p.split(path.sep).join('~').split('.hbs').join('');
    }

}
