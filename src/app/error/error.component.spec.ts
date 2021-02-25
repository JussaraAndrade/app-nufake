import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErroComponent } from './error.component';

describe('PageErroComponent', () => {
  let component: PageErroComponent;
  let fixture: ComponentFixture<PageErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
