import {Module} from '@nestjs/common';
import {MjmlService} from './services/mjml/mjml.service';
import {TemplatesController} from './controllers/templates/templates.controller';
import {PathsService} from './services/paths/paths.service';
import {ExamplesService} from './services/examples/examples.service';
import {TemplatesService} from './services/templates/templates.service';
import {HandlebarsService} from './services/handlebars/handlebars.service';
import {CompilerService} from './services/compiler/compiler.service';

@Module({
    imports: [],
    controllers: [TemplatesController],
    providers: [MjmlService, PathsService, ExamplesService, TemplatesService, HandlebarsService, CompilerService]
})
export class AppModule {
}
