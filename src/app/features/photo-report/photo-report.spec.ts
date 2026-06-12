import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoReport } from './photo-report';

describe('PhotoReport', () => {
    let component: PhotoReport;
    let fixture: ComponentFixture<PhotoReport>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoReport],
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoReport);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
