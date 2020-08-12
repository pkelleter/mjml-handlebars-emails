import {TestBed} from '@angular/core/testing';

import {AExamplesService} from './a-examples.service';

describe('AExamplesService', () => {
    let service: AExamplesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AExamplesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
