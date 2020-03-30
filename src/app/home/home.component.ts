import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gridApi;
  gridColumnApi;
  covidGlobalData;
  allCountryData;
  countryData;

  columnDefs = [
    { headerName: 'Country', field: 'title', sortable: true },
    { headerName: 'Total Cases', field: 'total_cases', sortable: true },
    { headerName: 'Total Recovered', field: 'total_recovered', sortable: true },
    { headerName: 'Total Deaths', field: 'total_deaths', sortable: true },
    { headerName: 'Total New Cases Today', field: 'total_new_cases_today', sortable: true },
    { headerName: 'Total New Deaths Today', field: 'total_new_deaths_today', sortable: true },
    { headerName: 'Total Active Cases', field: 'total_active_cases', sortable: true },
    { headerName: 'Total Serious Cases', field: 'total_serious_cases', sortable: true }
  ];
  // 'total_cases', 'total_recovered', 'total_deaths', 'total_new_cases_today', 'total_new_deaths_today', 'total_active_cases', 'total_serious_cases'
  rowData: any;

  constructor(private http: HttpClient) { }

  // displayedColumns: string[] = ['title',];
  // dataSource: any;

  ngOnInit() {
    this.http.get('https://thevirustracker.com/free-api?global=stats').subscribe(
      (res) => {
        // console.log(res['results'][0]);
        this.covidGlobalData = res['results'][0];
      }
    );



    this.http.get('https://thevirustracker.com/free-api?countryTotal=IN').subscribe(
      (res) => {
        // console.log(res['countrydata'][0]);
        this.countryData = res['countrydata'][0];

      }
    )
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get('https://thevirustracker.com/free-api?countryTotals=ALL').subscribe(
      (res) => {
        // console.log(res['countryitems']);
        this.allCountryData = Object.values(res['countryitems'][0]);
        console.log(this.allCountryData)
        // this.allCountryData.forEach((element, index) => {
        //   console.log('ele ', element[index + 1]);
        // });
        this.rowData = this.allCountryData;
        // this.dataSource = this.allCountryData;
      }
    )
  }

}

