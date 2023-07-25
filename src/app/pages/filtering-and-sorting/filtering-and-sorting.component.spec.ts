import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringAndSortingComponent } from './filtering-and-sorting.component';

describe('FilteringAndSortingComponent', () => {
  let component: FilteringAndSortingComponent;
  let fixture: ComponentFixture<FilteringAndSortingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteringAndSortingComponent]
    });
    fixture = TestBed.createComponent(FilteringAndSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
