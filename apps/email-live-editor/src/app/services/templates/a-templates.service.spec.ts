import {TestBed} from '@angular/core/testing';

import {ATemplatesService} from './a-templates.service';

describe('ATemplatesService', () => {
    let service: ATemplatesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ATemplatesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
