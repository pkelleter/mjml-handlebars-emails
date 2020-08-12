import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CompileTemplateParams} from '../../../../../shared/interfaces/compile-template-params';
import {CompileTemplateResponse} from '../../../../../shared/interfaces/compile-template-response';
import {TemplateExamples} from '../../../../../shared/interfaces/template-examples';
import {ExamplesService} from '../../services/examples/examples.service';
import {CompilerService} from '../../services/compiler/compiler.service';

@Controller('templates')
export class TemplatesController {

    constructor(private examplesService: ExamplesService,
                private compilerService: CompilerService) {
    }

    @Get('examples')
    public async getExamples(): Promise<TemplateExamples[]> {
        return this.examplesService.getExamples();
    }

    @Post('compile/:id')
    public async compileTemplate(@Param('id') id: string,
                                 @Body() body: CompileTemplateParams): Promise<CompileTemplateResponse> {
        return this.compilerService.compileTemplate(id, body.values);
    }

}
