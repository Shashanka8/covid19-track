import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  covidGlobalData;
  allCountryData;
  countryData;

  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true },
    { headerName: 'Model', field: 'model', sortable: true },
    { headerName: 'Price', field: 'price', sortable: true }
  ];

  rowData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://thevirustracker.com/free-api?global=stats').subscribe(
      (res) => {
        // console.log(res['results'][0]);
        this.covidGlobalData = res['results'][0];
      }
    );

    this.http.get('https://thevirustracker.com/free-api?countryTotals=ALL').subscribe(
      (res) => {
        console.log(res['countryitems'][0]);
        this.allCountryData = res['countryitems'][0];
        this.rowData = this.allCountryData;
      }
    )

    this.http.get('https://thevirustracker.com/free-api?countryTotal=IN').subscribe(
      (res) => {
        // console.log(res['countrydata'][0]);
        this.countryData = res['countrydata'][0];

      }
    )
  }

}

