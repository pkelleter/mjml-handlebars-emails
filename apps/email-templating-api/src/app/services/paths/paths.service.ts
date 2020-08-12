import {Injectable} from '@nestjs/common';

@Injectable()
export class PathsService {

    public readonly appRoot: string;
    public readonly assetsRoot: string;
    public readonly templatesRoot: string;

    constructor() {
        this.appRoot = this.getAppRootPath();
        this.assetsRoot = this.getAssetPath();
        this.templatesRoot = this.getTemplatesPath();
    }

    private getAppRootPath(): string {
        const path = require('path');
        return path.resolve(__dirname);
    }

    private getAssetPath(): string {
        return `${this.getAppRootPath()}/assets`;
    }

    private getTemplatesPath(): string {
        return `${this.getAssetPath()}/templates`;
    }

}
