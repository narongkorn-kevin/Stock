import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface DataTablesResponse {
  data: any[];
  draw: number;
  to: number;
  total: number;
}

const HEROES = [];

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})


export class StockComponent implements OnInit {

  HEROES = [
    { id: 0, name: 'Dr Nice' },
    
  ];

  dtOptions: DataTables.Settings = {};
  stocks: any = [];

  addForm = this.fb.group({
    name_part: [''],
    description: [''],
    stock: [''],
  });




  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.LoadTable();
  }
  LoadTable(): void{

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: true,

      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://127.0.0.1:8000/api/datatable_Data1',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.stocks = resp.data;

            callback({
              recordsTotal: resp.to,
              recordsFiltered: resp.total,
              data: []
            });
          });
      },
      columns: [
        { data: 'id' },
        { data: 'name_part' },
        { data: 'description' },
        { data: 'stock' },
        { data: 'input' },
        { data: 'output' },
        { data: 'exc' },
        { data: 'adj' },
        { data: 'balance' },

      ]
    };
  }

  addSubmit(): void {
    console.log(this.addForm.value)
    this.http.post('http://127.0.0.1:8000/api/insert_Data1', this.addForm.value)
    .subscribe(
      (res) => {
        window.location.reload();
      }
    );
  }

  onAdd(): void {
    // console.log(111);
    this.HEROES.push({ id: 11, name: 'Dr Nice' });
  }

}
