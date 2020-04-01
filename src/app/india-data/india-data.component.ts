import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// export interface CountryElement {
//   state: string;
//   confirmed: number;
//   active: number;
//   recovered: number;
//   deaths: number;
// }

// const stateData: CountryElement[] = [
//   { state: 'Maharashtra', confirmed: 302, active: 252, recovered: 39, deaths: 11 },
//   { state: 'Kerala', confirmed: 241, active: 215, recovered: 24, deaths: 2 },
//   { state: 'Tamil Nadu', confirmed: 124, active: 117, recovered: 6, deaths: 1 },
//   { state: 'Delhi', confirmed: 120, active: 112, recovered: 6, deaths: 2 },
//   { state: 'Uttar Pradesh', confirmed: 104, active: 87, recovered: 17, deaths: 0 },
//   { state: 'Karnataka', confirmed: 101, active: 90, recovered: 8, deaths: 3 },
//   { state: 'Rajasthan', confirmed: 93, active: 90, recovered: 3, deaths: 0 },
//   { state: 'Telengana', confirmed: 92, active: 70, recovered: 14, deaths: 8 },
//   { state: 'Gujarat', confirmed: 74, active: 63, recovered: 5, deaths: 6 },
//   { state: 'Madhya Pradesh', confirmed: 66, active: 62, recovered: 0, deaths: 4 },
//   { state: 'Jammu & Kashmir', confirmed: 55, active: 52, recovered: 1, deaths: 2 },
//   { state: 'Andhra Pradesh', confirmed: 44, active: 43, recovered: 1, deaths: 0 },
//   { state: 'Haryana', confirmed: 43, active: 26, recovered: 17, deaths: 0 },
//   { state: 'Punjab', confirmed: 41, active: 36, recovered: 1, deaths: 4 },
//   { state: 'West Bengal', confirmed: 27, active: 23, recovered: 0, deaths: 4 },
//   { state: 'Bihar', confirmed: 21, active: 20, recovered: 0, deaths: 1 },
//   { state: 'Chandigarh', confirmed: 15, active: 15, recovered: 0, deaths: 0 },
//   { state: 'Ladakh', confirmed: 13, active: 10, recovered: 3, deaths: 0 },
//   { state: 'Andaman & Nicobar Islands', confirmed: 10, active: 10, recovered: 0, deaths: 0 },
//   { state: 'Chhattisgarh', confirmed: 9, active: 7, recovered: 2, deaths: 0 },
//   { state: 'Uttarakhand', confirmed: 7, active: 5, recovered: 2, deaths: 0 },
//   { state: 'Goa', confirmed: 5, active: 5, recovered: 0, deaths: 0 },
//   { state: 'Odisha', confirmed: 4, active: 4, recovered: 0, deaths: 0 },
//   { state: 'Himachal Pradesh', confirmed: 3, active: 1, recovered: 1, deaths: 1 },
//   { state: 'Assam', confirmed: 1, active: 1, recovered: 0, deaths: 0 },
//   { state: 'Jharkhand', confirmed: 1, active: 1, recovered: 0, deaths: 0 },
//   { state: 'Manipur', confirmed: 1, active: 1, recovered: 0, deaths: 0 },
//   { state: 'Mizoram', confirmed: 1, active: 1, recovered: 0, deaths: 0 },
//   { state: 'Puducherry', confirmed: 1, active: 1, recovered: 0, deaths: 0 },
// ];

@Component({
  selector: 'app-india-data',
  templateUrl: './india-data.component.html',
  styleUrls: ['./india-data.component.scss']
})
export class IndiaDataComponent implements OnInit {


  countryData;
  dataSource;
  stateData;
  updateDate;
  updateTime;

  // displayedColumns: string[] = ['state', 'confirmed', 'recovered', 'deaths', 'active'];
  displayedColumns: string[] = ['loc', 'confirmed', 'discharged', 'deaths'];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.dataSource = stateData;
    // this.http.get('https://thevirustracker.com/free-api?countryTotal=IN').subscribe(
    this.http.get('https://corona.lmao.ninja/countries/IN').subscribe(
      (res) => {
        if (res) {
          console.log(res);
          // this.countryData = res['countrydata'][0];
          this.countryData = res;
        }
      }
    );

    this.http.get('https://api.rootnet.in/covid19-in/stats/latest').subscribe(
      (res) => {
        if (res) {
          // console.log(res['lastRefreshed'])
          this.stateData = res['data']['regional'];
          this.stateData.forEach(element => {
            element['confirmed'] = element['confirmedCasesIndian'] + element['confirmedCasesForeign'];
            // console.log(element)
          });
          this.dataSource = this.stateData;
          let gdata = res['lastRefreshed'].split('T');
          let gtime = gdata[1].split(':');
          let cdata = gdata[0].split("-");
          // console.log(gdata[0] + "->" + gtime[0] + ":" + gtime[1])
          this.updateDate = cdata[2] + "/" + cdata[1] + "/" + cdata[0];
          this.updateTime = gtime[0] + ":" + gtime[1];
        }
      }
    )
  }

}
