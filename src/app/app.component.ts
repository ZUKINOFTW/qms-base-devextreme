import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qms-design-devextreme';
  dataSource = [
    { ID: 1, Name: 'John', Age: 25, Country: 'USA' },
    { ID: 2, Name: 'Emily', Age: 30, Country: 'Canada' },
    // Thêm dữ liệu khác...
  ];
  static getOrderDay: any;
}
