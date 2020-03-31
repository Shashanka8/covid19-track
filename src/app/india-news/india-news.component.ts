import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-india-news',
  templateUrl: './india-news.component.html',
  styleUrls: ['./india-news.component.scss']
})
export class IndiaNewsComponent implements OnInit {

  indiaNews;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://thevirustracker.com/free-api?countryNewsTotal=IN').subscribe(
      (res) => {
        // console.log(res['countrynewsitems']);
        let newVal = Object.values(res['countrynewsitems'][0]);
        let len = newVal.length;
        // console.log(len)
        this.indiaNews = newVal.splice(len - 20, len).reverse();
      }
    )
  }

}
