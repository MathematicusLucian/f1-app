import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'F1 stats';
  track:any={}
	seasonRounds=[
		{"id_track":1, "name":"Monaco"},
		{"id_track":2, "name":"Silverstone"}
	]
  BASE_URL = "http://localhost/api/round_results?season=2008&round_no=6"
  seasonRoundData = {};
  constructor(private appService: AppService, private http: HttpClient) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {}

	select_round(){
    console.log(this.track.id_track)
    this.http.get<any>(this.BASE_URL).subscribe(data => {
      this.seasonRoundData = data;
      console.log(this.seasonRoundData)
    })
	}
}
