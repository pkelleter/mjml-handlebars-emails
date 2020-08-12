import {Test, TestingModule} from '@nestjs/testing';
import {HandlebarsService} from './handlebars.service';

describe('HandlebarsService', () => {
    let service: HandlebarsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HandlebarsService],
        }).compile();

        service = module.get<HandlebarsService>(HandlebarsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
