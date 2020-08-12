import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RenderExampleComponent} from './render-example.component';

describe('RenderExampleComponent', () => {
    let component: RenderExampleComponent;
    let fixture: ComponentFixture<RenderExampleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RenderExampleComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RenderExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
