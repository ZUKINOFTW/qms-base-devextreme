import { Component } from '@angular/core';
import { Customer } from 'src/app/shared/models/customer.model';
import { GroupingService } from 'src/app/shared/services/grouping/grouping.service';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.css'],
})
export class GroupingComponent {
  api_end_point: string = 'http://222.252.25.37:8312/api/product-orders';
  dataSource: DataSource;
  customers: Customer[] = [];
  expand: boolean = false;
  searchText: string;
  keyColumn: string[] = [];
  showFilterRow: boolean = true;
  showHeaderFilter: boolean = true;
  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;

  constructor(
    private groupingService: GroupingService,
    private http: HttpClient
  ) {
    const token: string =
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJacjN1bkhsN0FNdHBiYUhhMWU5MHp3M0Vvc3FGbWRyaDJ6TEZXcjk3QVE4In0.eyJleHAiOjE2ODk4NTU2MzksImlhdCI6MTY4OTg1MjAzOSwianRpIjoiMTg4MzAyMWUtN2UxOS00NjYyLWIxYzAtMTk5Yzk4YTk4N2RhIiwiaXNzIjoiaHR0cHM6Ly9zc28ueGZhY3Rvcnkudm4vYXV0aC9yZWFsbXMvRmFjZW5ldCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIwY2Y2ZjRiZS03ZTBjLTQwYjYtOWI2Ni1hNjhlOGVjOTRmM2QiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtcnBfYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiI1ZDA4ZGQ0Zi1hZWJjLTRmOWEtOGFkYS0yYzVhZjA1YWZjZGIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicWx5X0ROTCIsIk1SUF9NSCIsIk1SUF9RTCIsInJlc291cmNlJHN5c3RlbS1mdWxsLWFjY2VzcyIsInJvbGVzIiwiTVJQX0RIU1giLCJNUlBfVEtLVCIsInRoZW1fc3VhX3hvYSIsIk1SUF9IVCIsIk1SUF9LSERIIiwic2NyZWVuLlByb2dyYW1pbmciLCJzY3JlZW4uV29ya09yZGVyTWFuYWdlciIsIk1SUF9HU1RELUNyZWF0ZSIsIm9mZmxpbmVfYWNjZXNzIiwiTVJQX0tUViIsInNjcmVlbi5Nb25pdG9yIiwidW1hX2F1dGhvcml6YXRpb24iLCJNUlBfR1NURC1WaWV3IiwiTVJQX1RLIiwiZGVmYXVsdC1yb2xlcy1xbHN4IiwiZGVmYXVsdC1yb2xlcy1mYWNlbmV0IiwiYWRtaW5fbXJwIiwiTVJQX1FMU1giLCJwaGVfZHV5ZXQiLCJzY3JlZW4uUHJvZHVjdE9yZGVyIiwiTVJQX0siLCJNUlBfQkMiLCJNUlBfUyIsInFseV9kb2lfY2hpZXUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNWQwOGRkNGYtYWViYy00ZjlhLThhZGEtMmM1YWYwNWFmY2RiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlcyI6WyJxbHlfRE5MIiwiTVJQX01IIiwiTVJQX1FMIiwicmVzb3VyY2Ukc3lzdGVtLWZ1bGwtYWNjZXNzIiwicm9sZXMiLCJNUlBfREhTWCIsIk1SUF9US0tUIiwidGhlbV9zdWFfeG9hIiwiTVJQX0hUIiwiTVJQX0tIREgiLCJzY3JlZW4uUHJvZ3JhbWluZyIsInNjcmVlbi5Xb3JrT3JkZXJNYW5hZ2VyIiwiTVJQX0dTVEQtQ3JlYXRlIiwib2ZmbGluZV9hY2Nlc3MiLCJNUlBfS1RWIiwic2NyZWVuLk1vbml0b3IiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIk1SUF9HU1RELVZpZXciLCJNUlBfVEsiLCJkZWZhdWx0LXJvbGVzLXFsc3giLCJkZWZhdWx0LXJvbGVzLWZhY2VuZXQiLCJhZG1pbl9tcnAiLCJNUlBfUUxTWCIsInBoZV9kdXlldCIsInNjcmVlbi5Qcm9kdWN0T3JkZXIiLCJNUlBfSyIsIk1SUF9CQyIsIk1SUF9TIiwicWx5X2RvaV9jaGlldSJdLCJuYW1lIjoiRmFjZW5ldCBBZG1pbiIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZ2l2ZW5fbmFtZSI6IkZhY2VuZXQiLCJmYW1pbHlfbmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBmYWNlbmV0LnZuIn0.K1QPp6vcinEqiD6Ac9agLbPbJspoObZoyvcE4RHooWi3aUt3kgC5rTuIbnXlhSu8uv1CUa3FccHhYnXrcXsamH0dmWp70YdqN87LyY8PCBvU4GsTWHuC6oGqE10AlElhEX5V7FJbJbTeb0V-TBPSkGvC4khhXZh7z1ntBZdl7imAJnXZTKGAnHnBG5DRQbIdMipUS-teBkg9QDQVgsot0p4OinGuU-eDawLZBvQwiBKvVjhJRDgIrnA-FDkw0nKiEY70mxVgZ06muTy07D1vFptYZlYpxoKLcSdgK1wTMT5zDXQbrpNMsiLDONEY1kujYpRjFXq528DlN50qZtBMrQ';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.dataSource = new DataSource({
      load: (loadOptions: any) => {
        const firstRequest = {
          pageNumber: this.dataSource.pageIndex(),
          pageSize: this.dataSource.pageSize(),
          filter: {
            poCode: '',
            customerCode: '',
            customerName: '',
            poType: '',
            orderedTime: null,
            deliveryTime: null,
            salesCode: '',
            salesName: '',
          },
        };
        return lastValueFrom(
          this.http.post(this.api_end_point, firstRequest, { headers })
        ).then((res: any) => {
          console.log(res);
          // this.keyColumn = Object.keys(res.data[0]);
          return {
            data: res?.data,
            totalCount: res?.dataCount,
          };
        });
      },
    });
  }

  ngOnInit(): void {
    this.customers = this.groupingService.getCustomers();
  }

  loadData(event: any) {
    console.log(event);

    switch (event.value) {
      case 'paging.pageSize': {
        this.dataSource.pageSize(event.value);
        break;
      }
      case 'paging.pageIndex': {
        this.dataSource.pageIndex(event.value);
        break;
      }
      default: {
        this.dataSource.pageIndex(event.value);
        break;
      }
    }
  }

  event(event: any) {
    console.log(event);
  }

  test() {
    console.log('test');
  }

  log(text: string) {
    // console.log(this.searchText);
  }

  onFilterValueChange(event: any) {
    console.log(event);
  }
}
