import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { FooterComponent } from './details/footer/footer.component';
import { SiderComponent } from './details/sider/sider.component';
import { MenuComponent } from './details/menu/menu.component';
import { BreadcrumbComponent } from './details/breadcrumb/breadcrumb.component';
import { GroupingComponent } from './pages/grouping/grouping.component';
import { FilteringAndSortingComponent } from './pages/filtering-and-sorting/filtering-and-sorting.component';
import { FocusedRowComponent } from './pages/focused-row/focused-row.component';
import { RowDragAndDropComponent } from './pages/row-drag-and-drop/row-drag-and-drop.component';
import {
  DxCheckBoxModule,
  DxNumberBoxModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    CreateTemplateComponent,
    FooterComponent,
    SiderComponent,
    MenuComponent,
    BreadcrumbComponent,
    GroupingComponent,
    FilteringAndSortingComponent,
    FocusedRowComponent,
    RowDragAndDropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
