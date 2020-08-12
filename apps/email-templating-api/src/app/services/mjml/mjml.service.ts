import {Injectable} from '@nestjs/common';

@Injectable()
export class MjmlService {

    private readonly mjml2html = require('mjml');

    private readonly mjmlOptions = {
        minify: true,
        minifyOptions: {
            minifyCSS: true
        },
        keepComments: false
    };

    constructor() {
    }

    public async compileTemplate(template: string): Promise<string> {
        const compiled = this.mjml2html(template, this.mjmlOptions);
        if (compiled.errors.length) {
            // TODO: proper error handling
            const error = compiled.errors[0];
            throw new Error(`on ${error.tagName} at line ${error.line}: ${error.message}`);
        }
        return compiled.html;
    }

}
