import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDComponent } from './section-d.component';

describe('SectionDComponent', () => {
  let component: SectionDComponent;
  let fixture: ComponentFixture<SectionDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
