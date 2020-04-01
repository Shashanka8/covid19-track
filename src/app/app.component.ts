import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covid';

  data;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get('https://thevirustracker.com/free-api?global=stats').subscribe(
    this.http.get('https://corona.lmao.ninja/all').subscribe(
      (res) => {
        if (res) {
          // console.log(res);
          this.data = 'data';
          // this.covidGlobalData = res['results'][0];
        } else {
          this.data = '';
        }
      },
      (err) => {
        this.data = '';
      }
    );
  }

}
