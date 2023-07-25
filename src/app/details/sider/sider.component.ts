import { Component } from '@angular/core';

@Component({
  selector: 'fn-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
})
export class SiderComponent {
  sider: {
    name: string;
    open: boolean;
    link: string | null;
    children: { name: string; open: boolean; link: string }[];
  }[] = [
    {
      name: 'Demos Devextreme',
      open: false,
      link: null,
      children: [
        { name: 'Grouping', open: false, link: 'grouping' },
        {
          name: 'Filtering and Sorting',
          open: false,
          link: 'filtering-and-sorting',
        },
        { name: 'Focused row', open: false, link: 'focused-row' },
        { name: 'Row Drag & Drop', open: false, link: 'row-drag-and-drop' },
      ],
    },
    {
      name: 'Quản lý mẫu biên bản',
      open: false,
      link: null,
      children: [
        { name: 'Quản lý tiêu chí kiểm tra', open: false, link: '' },
        { name: 'Mẫu biên bản kiểm tra', open: false, link: '' },
        { name: 'Quản lý phiếu xuyên suốt', open: false, link: '' },
      ],
    },
    { name: 'Quản lý chỉ tiêu AQL', open: false, link: null, children: [] },
    {
      name: 'Danh mục lỗi',
      open: false,
      link: null,
      children: [],
    },
    {
      name: 'Danh mục công đoạn kiểm tra',
      open: false,
      link: null,
      children: [
        { name: 'Gọi API lấy data từ mdm', open: false, link: '' },
        { name: 'Xem danh sách công đoạn', open: false, link: '' },
      ],
    },
    {
      name: 'Kiểm tra IQC / Quản lý biên bản kiểm tra NVL',
      open: false,
      link: null,
      children: [
        {
          name: 'Thêm mới biên bản kiểm tra nguyên vật liệu',
          open: false,
          link: '',
        },
        { name: 'Quản lý biên bản kiểm tra', open: false, link: '' },
        { name: 'Khai báo lỗi vào biên bản kiểm tra', open: false, link: '' },
        { name: 'Phê duyệt', open: false, link: '' },
        { name: 'Đồng bộ hồ sơ EPR', open: false, link: '' },
        { name: 'Tạo phiếu gủi trả bộ phận mua hàng', open: false, link: '' },
        { name: 'Xuất file biên bản', open: false, link: '' },
      ],
    },
    {
      name: 'Khai báo thông tin công đoạn',
      open: false,
      link: null,
      children: [
        { name: 'Lấy data từ planing', open: false, link: '' },
        { name: 'Xem danh sách lệnh sản xuất', open: false, link: '' },
        { name: 'Kiểm tra nguyên vật liệu 100%', open: false, link: '' },
        { name: 'Kiểm tra nguyên vật liệu rút nhiệm', open: false, link: '' },
        { name: 'Công đoạn in offset', open: false, link: '' },
        { name: 'Công đoạn in lưới', open: false, link: '' },
        { name: 'Công đoạn in lay', open: false, link: '' },
        { name: 'Công đoạn ép cắt', open: false, link: '' },
        { name: 'Công đoạn kiểm soát phôi thẻ', open: false, link: '' },
        { name: 'Công đoạn hots', open: false, link: '' },
        { name: 'Công đoạn IC', open: false, link: '' },
        { name: 'Công đoạn CTH', open: false, link: '' },
        { name: 'Công đoạn đóng gói', open: false, link: '' },
        { name: 'Kiểm tra lỗi sửa lại', open: false, link: '' },
      ],
    },
    {
      name: 'Kiểm tra OQC',
      open: false,
      link: null,
      children: [
        { name: 'Khai báo biên bản kiểm tra nhập kho', open: false, link: '' },
        { name: 'Quản lý biên bản kiểm tra nhập kho', open: false, link: '' },
        { name: 'Xem danh sách biên bản kiểm tra', open: false, link: '' },
        { name: 'Khai báo lỗi vào biên bản kiểm tra', open: false, link: '' },
        { name: 'Phê duyệt nhập kho', open: false, link: '' },
        { name: 'API đồng bộ nhập kho ERP', open: false, link: '' },
      ],
    },
    {
      name: 'Phê duyệt final QC',
      open: false,
      link: null,
      children: [
        { name: 'Danh sách lệnh chờ phê duyệt', open: false, link: '' },
        { name: 'Xem chi tiết lệnh chờ phê duyệt', open: false, link: '' },
        { name: 'Phê duyệt', open: false, link: '' },
        { name: 'Xuất file', open: false, link: '' },
      ],
    },
    {
      name: 'Cảnh báo',
      open: false,
      link: null,
      children: [],
    },
    {
      name: 'Báo cáo',
      open: false,
      link: null,
      children: [
        { name: 'Thống kê, tiến độ', open: false, link: '' },
        { name: 'Báo cáo chất lượng kiểm tra IQC', open: false, link: '' },
      ],
    },
    {
      name: 'Tích hợp',
      open: false,
      link: null,
      children: [
        { name: 'Tích hợp thiết bị scan', open: false, link: '' },
        { name: 'Tích hợp phân quyền trên keycloak', open: false, link: '' },
      ],
    },
  ];

  openParent(i: number) {
    this.sider[i].open = true;
  }
  clickParent(i: number) {
    this.closeAllParentReal();
    this.closeAllChildren();
    this.sider[i].open = true;
  }

  closeAllParent(): void {
    for (let i: number = 0; i < this.sider.length; i++) {
      if (this.sider[i].children.length === 0) {
        this.sider[i].open = false;
      }
    }
  }

  closeAllParentReal(): void {
    for (let i: number = 0; i < this.sider.length; i++) {
      this.sider[i].open = false;
    }
  }

  closeParent(i: number) {
    this.sider[i].open = false;
  }

  closeAllChildren(): void {
    for (let i = 0; i < this.sider.length; ++i) {
      if (this.sider[i].children.length !== 0) {
        for (let j: number = 0; j < this.sider[i].children.length; j++) {
          this.sider[i].children[j].open = false;
        }
      }
    }
  }

  openChildren(i: number, j: number) {
    this.closeAllParentReal();
    this.closeAllChildren();
    this.sider[i].open = true;
    this.sider[i].children[j].open = true;
  }
}
