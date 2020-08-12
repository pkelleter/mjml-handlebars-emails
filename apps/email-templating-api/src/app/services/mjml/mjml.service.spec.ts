import {Test, TestingModule} from '@nestjs/testing';
import {MjmlService} from './mjml.service';

describe('MjmlService', () => {
    let service: MjmlService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MjmlService],
        }).compile();

        service = module.get<MjmlService>(MjmlService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
