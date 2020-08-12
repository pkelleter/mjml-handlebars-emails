import {Test, TestingModule} from '@nestjs/testing';
import {APollingService} from './a-polling.service';

describe('APollingService', () => {
    let service: APollingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [APollingService],
        }).compile();

        service = module.get<APollingService>(APollingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
