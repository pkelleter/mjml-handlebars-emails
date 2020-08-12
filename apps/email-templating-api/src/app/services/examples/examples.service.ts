import {Injectable} from '@nestjs/common';
import {TemplateExamples} from '../../../../../shared/interfaces/template-examples';
import {TemplateExample} from '../../../../../shared/interfaces/template-example';
import {TemplatesService} from '../templates/templates.service';
import * as fs from 'fs';

@Injectable()
export class ExamplesService {

    private readonly fileSystem = require('fs');

    constructor(private templatesService: TemplatesService) {
    }

    public async getExamples(): Promise<TemplateExamples[]> {
        const templatePaths = await this.templatesService.getTemplatePaths();
        const templateExamples = templatePaths
            .map(templatePath => templatePath.replace('index.hbs', 'examples.json'))
            .filter(examplePath => fs.existsSync(examplePath))
            .map(async examplePath => ({
                templateId: this.templatesService.getTemplateIdByPath(examplePath),
                instances: await this.getExamplesByPath(examplePath)
            }));
        return Promise.all(templateExamples);
    }

    // TODO: error handling if file does not follow the proper structure?
    private async getExamplesByPath(examplePath: string): Promise<TemplateExample[]> {
        const fileContent = await this.fileSystem.promises.readFile(examplePath, {encoding: 'utf-8'});
        return JSON.parse(fileContent);
    }

}
