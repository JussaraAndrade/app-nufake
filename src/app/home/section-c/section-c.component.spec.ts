import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCComponent } from './section-c.component';

describe('SectionCComponent', () => {
  let component: SectionCComponent;
  let fixture: ComponentFixture<SectionCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
