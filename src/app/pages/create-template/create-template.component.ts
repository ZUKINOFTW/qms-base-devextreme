import { Component } from '@angular/core';
import { Json } from 'src/app/shared/models/models/json.model';
import { PushJson } from 'src/app/shared/models/models/pushJson.model';
import { Row } from 'src/app/shared/models/models/row.model';
// import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
// import { JsonService } from 'src/app/shared/services/json.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
})
export class CreateTemplateComponent {
  jsons: Json[] = [];
  jsonApi: Json[] = [];
  pushJson: PushJson[] = [];
  id: number = 0;
  types: string[] = ['string', 'number', 'date'];
  name: string = '';
  type: string = 'string';
  parent: string = 'Batman';
  parents: string[] = ['Batman'];
  table: Row[] = [];
  contents: string[] = [];
  header: { name: string; backGround: string; color: string }[] = [
    { name: 'Nền trắng chữ đen', backGround: 'FFFFFF', color: '373536' },
  ];

  style = {
    'background-color': `#${this.header[0].backGround}`,
    // color: `#${this.header[0].color}`,
    'text-align': 'center',
  };

  // constructor(private jsonservice: JsonService) {}

  // ngOnInit(): void {
  //   this.jsonservice.getJson().subscribe(
  //     (data) => {
  //       this.jsonApi = data;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  exportGrid(e: any) {
    // if (e.format === 'xlsx') {
    //   const workbook = new Workbook();
    //   const worksheet = workbook.addWorksheet('Main sheet');
    //   exportDataGrid({
    //     worksheet: worksheet,
    //     component: e.component,
    //   }).then(function () {
    //     workbook.xlsx.writeBuffer().then(function (buffer) {
    //       saveAs(
    //         new Blob([buffer], { type: 'application/octet-stream' }),
    //         'DataGrid.xlsx'
    //       );
    //     });
    //   });
    // } else if (e.format === 'pdf') {
    //   const doc = new jsPDF();
    //   exportDataGridToPdf({
    //     jsPDFDocument: doc,
    //     component: e.component,
    //   }).then(() => {
    //     doc.save('DataGrid.pdf');
    //   });
    // }
  }

  addNewChild(json: Json[], parent: string[]) {
    for (let i: number = 0; i < json.length; i++) {
      if (parent[0] === json[i].key) {
        if (parent.length === 1) {
          json[i].children.push({
            id: this.id,
            key: this.name,
            type: this.type,
            children: [],
          });
        } else {
          parent.shift();
          this.addNewChild(json[i].children, parent);
        }
      }
    }
  }

  addNew() {
    if (this.parent === 'Batman') {
      this.id = this.id + 1;
      this.jsons.push({
        id: this.id,
        key: this.name,
        type: this.type,
        children: [],
      });
      this.pushJson.push({
        id: this.id,
        key: this.name,
        type: this.type,
        parent: null,
      });
    } else if (this.name === '') {
      alert('Nhập thiếu thông tin');
    } else {
      this.id = this.id + 1;
      let splitParent: string[] = this.parent.split(' - ');
      let reveseparent = splitParent.reverse();
      this.pushJson.push({
        id: this.id,
        key: this.name,
        type: this.type,
        parent: splitParent[0],
      });
      this.addNewChild(this.jsons, reveseparent);
    }
    this.convertJsonToTable(this.jsons, 1);
    this.name = '';
    this.parents.push(
      `${this.pushJson[this.pushJson.length - 1].key}${
        this.parent === 'Batman' ? '' : ` - ${this.parent}`
      }`
    );
    this.contents = [];
    for (let i: number = 0; i < this.checkColspan(this.jsons, 1); i++) {
      this.contents.push(`Content ${i + 1}`);
    }
  }

  maxLevel: number = 1;

  checkLv(obj: Json[], level: number) {
    if (level > this.maxLevel) {
      this.maxLevel = level;
    }
    for (let i: number = 0; i < obj.length; i++) {
      if (obj[i].children.length !== 0) {
        this.checkLv(obj[i].children, level + 1);
      }
    }
  }

  checkRowSpan(json: Json[], lv: number, maxLv: number): number {
    if (json.length !== 0) {
      return 1;
    } else {
      return maxLv - lv;
    }
  }

  checkColspan(json: Json[], num: number): number {
    if (json.length > 1) {
      num = num + json.length - 1;
      for (let i: number = 0; i < json.length; i++) {
        num = num + this.checkColspan(json[i].children, 1) - 1;
      }
    }
    return num;
  }

  convertJsonToTable(json: Json[], lv: number) {
    if (lv === 1) {
      this.table = [];
      this.checkLv(json, 1);
    }
    if (this.table.length < lv) {
      this.table.push({
        colums: [],
      });
    }
    for (let i: number = 0; i < json.length; i++) {
      this.table[lv - 1].colums.push({
        rowSpan: this.checkRowSpan(json[i].children, lv - 1, this.maxLevel),
        colSpan: this.checkColspan(json[i].children, 1),
        content: json[i].key,
      });
      if (json[i].children.length !== 0) {
        this.convertJsonToTable(json[i].children, lv + 1);
      }
    }
  }

  save() {
    console.log(this.pushJson);
    // this.jsonservice.postJson(this.pushJson).subscribe();
  }

  deleteChild(json: Json[], name: string) {
    for (let i: number = 0; i < json.length; i++) {
      if (json[i].children.length > 0) {
        this.deleteChild(json[i].children, name);
      }
      if (name == json[i].key) {
        json.splice(i, 1);
      }
    }
  }

  revese() {
    if (this.jsons.length !== 0) {
      this.deleteChild(this.jsons, this.pushJson[this.pushJson.length - 1].key);
      this.pushJson.pop();
      this.parents.pop();
      this.id = this.id - 1;
      this.convertJsonToTable(this.jsons, 1);
      this.contents = [];
      for (let i: number = 0; i < this.checkColspan(this.jsons, 1); i++) {
        this.contents.push(`Content ${i + 1}`);
      }
      if (this.jsons.length === 0) {
        this.contents = [];
      }
    }
  }

  importFromApi(): void {
    this.convertJsonToTable(this.jsonApi, 1);
  }

  clearTable() {
    this.table = [];
    this.jsons = [];
    this.contents = [];
    this.pushJson = [];
    this.id = 0;
  }
}
