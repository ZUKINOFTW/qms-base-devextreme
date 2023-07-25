import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowDragAndDropComponent } from './row-drag-and-drop.component';

describe('RowDragAndDropComponent', () => {
  let component: RowDragAndDropComponent;
  let fixture: ComponentFixture<RowDragAndDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RowDragAndDropComponent]
    });
    fixture = TestBed.createComponent(RowDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
