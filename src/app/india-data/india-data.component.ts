import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-india-data',
  templateUrl: './india-data.component.html',
  styleUrls: ['./india-data.component.scss']
})
export class IndiaDataComponent implements OnInit {


  countryDeltaData;
  countryData;
  dataSource;
  stateData;
  updateDate;
  updateTime;

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Colors[] = [];

  // displayedColumns: string[] = ['state', 'confirmed', 'recovered', 'deaths', 'active'];
  displayedColumns: string[] = ['state', 'confirmed', 'deltaconfirmed', 'deaths', 'deltadeaths', 'active', 'recovered', 'lastupdatedtime'];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('https://api.covid19india.org/data.json').subscribe(
      (res) => {
        // console.log(res['statewise']);
        this.stateData = res['statewise'];
        this.countryData = res['statewise'][0];
        this.dataSource = this.stateData;
        // this.countryDeltaData = res['statewise'][0]['delta];

        this.doughnutChartLabels = ['Total Cases', 'Total Recovered', 'Total Active', 'Total Deaths'];
        this.doughnutChartData = [this.countryData['confirmed'], this.countryData['recovered'], this.countryData['active'], this.countryData['deaths']];
        this.doughnutChartColors = [{ backgroundColor: ["#0101DF", "#04B404", '#FE2E2E', '#A4A4A4'] }];
      }
    );


    // this.dataSource = stateData;
    // this.http.get('https://thevirustracker.com/free-api?countryTotal=IN').subscribe(
    // this.http.get('https://corona.lmao.ninja/countries/IN').subscribe(
    //   (res) => {
    //     if (res) {
    //       // console.log(res);
    //       // this.countryData = res['countrydata'][0];
    //       this.countryData = res;
    //     }
    //   }
    // );

    // this.http.get('https://api.rootnet.in/covid19-in/stats/latest').subscribe(
    //   (res) => {
    //     if (res) {
    //       // console.log(res['lastRefreshed'])
    //       this.stateData = res['data']['regional'];
    //       this.stateData.forEach(element => {
    //         element['confirmed'] = element['confirmedCasesIndian'] + element['confirmedCasesForeign'];
    //         // console.log(element)
    //       });
    //       this.stateData.sort((a, b) => {
    //         return b.confirmed - a.confirmed
    //       });
    //       // console.log(this.stateData);
    //       this.dataSource = this.stateData;
    //       let gdata = res['lastRefreshed'].split('T');
    //       let gtime = gdata[1].split(':');
    //       let cdata = gdata[0].split("-");
    //       // console.log(gdata[0] + "->" + gtime[0] + ":" + gtime[1])
    //       this.updateDate = cdata[2] + "/" + cdata[1] + "/" + cdata[0];
    //       this.updateTime = gtime[0] + ":" + gtime[1];
    //     }
    //   }
    // );
  }

}
