import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  covidGlobalData;
  allCountryData;

  constructor(private http: HttpClient) { }

  displayedColumns: string[] = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion'];

  // displayedColumns: string[] = ['title', 'total_cases', 'total_recovered', 'total_deaths', 'total_new_cases_today', 'total_new_deaths_today', 'total_active_cases', 'total_serious_cases'];
  dataSource: any;

  ngOnInit() {
    this.http.get('https://thevirustracker.com/free-api?global=stats').subscribe(
      (res) => {
        if (res) {
          // console.log(res['results'][0]);
          this.covidGlobalData = res['results'][0];
        }
      }
    );

    // this.http.get('https://thevirustracker.com/free-api?countryTotals=ALL').subscribe(
    this.http.get('https://corona.lmao.ninja/countries?sort={cases}').subscribe(
      (res) => {
        if (res) {
          // console.log(res['countryitems']);
          // console.log(res)
          // this.allCountryData = Object.values(res['countryitems'][0]);
          // console.log(this.allCountryData)
          // this.allCountryData.forEach((element, index) => {
          //   console.log('ele ', element[index + 1]);
          // });
          this.allCountryData = res;
          this.dataSource = this.allCountryData;
        }
      }
    );


  }

}

