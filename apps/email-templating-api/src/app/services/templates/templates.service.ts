import {Injectable} from '@nestjs/common';
import {PathsService} from '../paths/paths.service';
import {resolve} from 'path';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TemplatesService {

    constructor(private pathsService: PathsService) {
    }

    public async getTemplateById(id: string): Promise<string> {
        const templatePaths = await this.getTemplatePaths();
        const templatePath = templatePaths.find(p => (this.getTemplateIdByPath(p) === id));
        if (!templatePath) throw new Error(`Template Id "${id}" does not exist.`);
        return fs.promises.readFile(templatePath, 'utf-8');
    }

    public getTemplateIdByPath(templatePath: string): string {
        const split = templatePath.split(path.sep);
        return split[split.length - 2];
    }

    public async getTemplatePaths(): Promise<string[]> {
        return this.getPathsRecursively(
            this.pathsService.templatesRoot,
            (templatePath) => templatePath.endsWith('index.hbs')
        );
    }

    public async getPartialPaths(): Promise<string[]> {
        return this.getPathsRecursively(
            this.pathsService.templatesRoot,
            (partialPath) => (partialPath.endsWith('.hbs') && !partialPath.endsWith('index.hbs'))
        );
    }

    private async getPathsRecursively(directory: string, conditionChecker: (path: string) => boolean): Promise<string[]> {
        const result: string[] = [];
        const dirents = await fs.promises.readdir(directory, {withFileTypes: true});
        for (const dirent of dirents) {
            const direntPath = resolve(directory, dirent.name);
            if (dirent.isDirectory()) result.push(...await this.getPathsRecursively(direntPath, conditionChecker));
            if (conditionChecker(direntPath)) result.push(direntPath);
        }
        return result;
    }

}
