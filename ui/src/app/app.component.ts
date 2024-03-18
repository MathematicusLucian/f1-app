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
  season:any=null;
  track:any={}
	// years=[
	// 	{"id_year":1, "name":"2024"},
	// 	{"id_year":2, "name":"2023"}
	// ]
	// seasonRounds=[
	// 	{"id_track":1, "name":"Monaco"},
	// 	{"id_track":2, "name":"Silverstone"}
	// ]
  BASE_URL = "http://localhost/api/";
  SEASONS = "seasons";
  ROUNDS_FOR_SEASON = "rounds_for_season";
  SEASON_ROUND = "round_results?season=2008&round_no=6";
  retrievedSeasons = {}
  retrievedRoundsForSeason = {}
  retrivedSeasonRoundData = {};

  constructor(private appService: AppService, private http: HttpClient) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
    this.http.get<any>(this.BASE_URL+this.SEASONS).subscribe(data => {
      this.retrievedSeasons = data;
    })
  }

	select_season(){
  //   this.http.get<any>(this.BASE_URL+this.SEASON_ROUND).subscribe(data => {
  //     this.retrievedRoundsForSeason = data;
  //   })
	}

	// select_round(){
  //   this.http.get<any>(this.BASE_URL+this.SEASON_ROUND).subscribe(data => {
  //     this.retrivedSeasonRoundData = data;
  //   })
	// }
}
