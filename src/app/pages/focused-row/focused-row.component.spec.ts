import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedRowComponent } from './focused-row.component';

describe('FocusedRowComponent', () => {
  let component: FocusedRowComponent;
  let fixture: ComponentFixture<FocusedRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FocusedRowComponent]
    });
    fixture = TestBed.createComponent(FocusedRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
