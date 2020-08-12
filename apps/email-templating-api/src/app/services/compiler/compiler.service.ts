import {Injectable} from '@nestjs/common';
import {TemplatesService} from '../templates/templates.service';
import {HandlebarsService} from '../handlebars/handlebars.service';
import {MjmlService} from '../mjml/mjml.service';
import {CompileTemplateResponse} from '../../../../../shared/interfaces/compile-template-response';
import {environment} from '../../../environments/environment';

@Injectable()
export class CompilerService {

    private templateCache = new Map<string, HandlebarsTemplateDelegate>();

    constructor(private templatesService: TemplatesService,
                private handlebarsService: HandlebarsService,
                private mjmlService: MjmlService) {
    }

    public async compileTemplate(id: string, values: object): Promise<CompileTemplateResponse> {
        let handlebarsTemplate = this.templateCache.get(id);
        if (!handlebarsTemplate) {
            const template = await this.templatesService.getTemplateById(id);
            handlebarsTemplate = await this.handlebarsService.compileTemplate(template);
            if (environment.production) this.templateCache.set(id, handlebarsTemplate);
        }
        const renderedTemplate = handlebarsTemplate(values);
        const responsiveTemplate = await this.mjmlService.compileTemplate(renderedTemplate);
        return {compiledTemplate: responsiveTemplate};
    }


}
