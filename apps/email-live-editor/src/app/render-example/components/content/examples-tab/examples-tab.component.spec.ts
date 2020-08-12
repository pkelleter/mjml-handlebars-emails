import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamplesTabComponent} from './examples-tab.component';

describe('ExamplesTabComponent', () => {
    let component: ExamplesTabComponent;
    let fixture: ComponentFixture<ExamplesTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ExamplesTabComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamplesTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
