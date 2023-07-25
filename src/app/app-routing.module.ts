import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupingComponent } from './pages/grouping/grouping.component';
import { FilteringAndSortingComponent } from './pages/filtering-and-sorting/filtering-and-sorting.component';
import { FocusedRowComponent } from './pages/focused-row/focused-row.component';
import { RowDragAndDropComponent } from './pages/row-drag-and-drop/row-drag-and-drop.component';

const routes: Routes = [
  { path: '', component: GroupingComponent },
  { path: 'grouping', component: GroupingComponent },
  { path: 'filtering-and-sorting', component: FilteringAndSortingComponent },
  { path: 'focused-row', component: FocusedRowComponent },
  { path: 'row-drag-and-drop', component: RowDragAndDropComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
