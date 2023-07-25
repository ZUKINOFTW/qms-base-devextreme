import { Component } from '@angular/core';
import { Employee } from 'src/app/shared/models/imployee.model';
import { Task } from 'src/app/shared/models/task.model';
import { Status } from 'src/app/shared/models/status.model';
import { RowDragAndDropService } from 'src/app/shared/services/RowDragAndDrop/row-drag-and-drop.service';

@Component({
  selector: 'app-row-drag-and-drop',
  templateUrl: './row-drag-and-drop.component.html',
  styleUrls: ['./row-drag-and-drop.component.css'],
})
export class RowDragAndDropComponent {
  tasks: Array<Task>;

  employees: Array<Employee>;

  statuses: Array<Status>;

  showDragIcons: boolean;

  constructor(private service: RowDragAndDropService) {
    this.tasks = this.service.getTasks();

    this.employees = service.getEmployees();

    this.statuses = service.getStatuses();

    this.showDragIcons = true;

    this.onReorder = this.onReorder.bind(this);
  }

  onReorder(e: any) {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = this.tasks.findIndex(
      (item) => item.ID === visibleRows[e.toIndex].data.ID
    );
    const fromIndex = this.tasks.findIndex((item) => item.ID === e.itemData.ID);

    this.tasks.splice(fromIndex, 1);
    this.tasks.splice(toIndex, 0, e.itemData);
  }
}
