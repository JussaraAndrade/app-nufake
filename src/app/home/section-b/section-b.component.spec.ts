import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBComponent } from './section-b.component';

describe('SectionBComponent', () => {
  let component: SectionBComponent;
  let fixture: ComponentFixture<SectionBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
