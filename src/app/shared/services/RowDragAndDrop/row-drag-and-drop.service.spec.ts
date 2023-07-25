import { TestBed } from '@angular/core/testing';

import { RowDragAndDropService } from './row-drag-and-drop.service';

describe('RowDragAndDropService', () => {
  let service: RowDragAndDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowDragAndDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
