import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-india-history',
  templateUrl: './india-history.component.html',
  styleUrls: ['./india-history.component.scss']
})
export class IndiaHistoryComponent implements OnInit {

  // Chart 1
  barChartOptions1: ChartOptions = {
    responsive: true,
  };
  barChartLabels1: Label[] = [];
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartPlugins1 = [];

  barChartData1: ChartDataSets[] = [
    { data: [], label: 'Confirmed Cases' }
  ];

  // Chart 2
  barChartOptions2: ChartOptions = {
    responsive: true,
  };
  barChartLabels2: Label[] = [];
  barChartType2: ChartType = 'bar';
  barChartLegend2 = true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: [], label: 'Recovered Cases' }
  ];

  // Chart 3
  barChartOptions3: ChartOptions = {
    responsive: true,
  };
  barChartLabels3: Label[] = [];
  barChartType3: ChartType = 'bar';
  barChartLegend3 = true;
  barChartPlugins3 = [];

  barChartData3: ChartDataSets[] = [
    { data: [], label: 'Death Cases' }
  ];

  confirmedData;
  deathsData;
  recoveredData;
  confirmedValue = [];
  deathValue = [];
  recoveredValue = [];

  allDate;
  allFormatDate = [];

  constructor(private http: HttpClient) {
    this.allFormatDate = [];
    this.confirmedValue = [];
    this.deathValue = [];
    this.recoveredValue = [];

    var startDate = new Date("2020-03-06"); //YYYY-MM-DD
    var endDate = new Date(); //YYYY-MM-DD

    var getDateArray = function (start, end) {
      var arr = new Array();
      var dt = new Date(start);
      while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    }
    var dateArr = getDateArray(startDate, endDate);
    // console.log(dateArr)
    dateArr.forEach(element => {
      // console.log(element)
      var oneDate = new Date(element);
      // this.allDate = (oneDate.getMonth() + 1) + "/" + oneDate.getDate() + "/" + oneDate.getFullYear().toString().slice(0, 2);
      this.allDate = oneDate.getDate() + "/" + (oneDate.getMonth() + 1) + "/" + oneDate.getFullYear().toString().slice(0, 2);
      this.allFormatDate.push(this.allDate);
      // console.log(this.allDate);
    });
  }

  ngOnInit(): void {
    // console.log(this.allFormatDate)
    this.http.get('https://corona.lmao.ninja/v2/historical/IN').subscribe(
      (res) => {
        // console.log('hist ', res['timeline']);
        this.confirmedData = res['timeline']['cases'];
        this.deathsData = res['timeline']['deaths'];
        this.recoveredData = res['timeline']['recovered'];
        // console.log(this.confirmedData);
        Object.values(this.confirmedData).forEach((element) => {
          // console.log(element);
          this.confirmedValue.push(element);
        });
        this.barChartLabels1 = this.allFormatDate;
        this.barChartData1[0].data = this.confirmedValue;

        Object.values(this.recoveredData).forEach((element) => {
          this.recoveredValue.push(element);
        });
        this.barChartLabels2 = this.allFormatDate;
        this.barChartData2[0].data = this.recoveredValue;

        Object.values(this.deathsData).forEach((element) => {
          this.deathValue.push(element);
        });
        this.barChartLabels3 = this.allFormatDate;
        this.barChartData3[0].data = this.deathValue;


      }
    );
  }

}
