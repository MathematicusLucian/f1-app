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
  circuit:any=null;
  BASE_URL = "http://localhost/api/";
  seasons_endpoint = "seasons";
  retrievedSeasons = {}
  retrievedRoundsForSeason = {}
  retrivedSeasonRoundData = {};

  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(this.BASE_URL+this.seasons_endpoint).subscribe(data => {
      this.retrievedSeasons = data;
      this.season = this.retrievedSeasons[0];
      this.setupRoundsDropdown();
    })
  }

  setupRoundsDropdown(): void {
    const round_for_season_endpoint = `rounds_for_season?season=${this.season.season}`;
    this.http.get<any>(this.BASE_URL + round_for_season_endpoint).subscribe(data => {
      this.retrievedRoundsForSeason = data;
      this.circuit = this.retrievedRoundsForSeason[0];
      this.setupView();
    })
  }

  setupView(): void {
    const round_results_endpoint = `round_results?season=${this.season.season}&round_no=${this.circuit.circuitId}`;
    this.http.get<any>(this.BASE_URL + round_results_endpoint).subscribe(data => {
      this.retrivedSeasonRoundData = data;
    })
  }

	selectSeason(): void {
    this.setupRoundsDropdown();
	}

	selectRound(): void {
    this.setupView();
	}
}
