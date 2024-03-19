from __future__ import annotations
from typing import Callable, List 
import json
from operator import itemgetter
import requests
from uritemplate import URITemplate
HOST = "https://ergast.com/api"
SERIES = "f1"

# pylint: disable=too-many-public-methods
class Ergast:
    def __init__(self) -> None:
        self.params = {}

    def run_request(self, resource, season=None, round_no=None, limit=None, offset=None) -> dict:
        url_tmpl = URITemplate(
            "https://ergast.com/api{/series}{/season}{/round}"
            "{/resource}.json{?limit,offset}"
        )
        url = url_tmpl.expand(
            host=HOST,
            series=SERIES,
            season=season,
            round=round_no,
            resource=resource,
            limit=limit,
            offset=offset,
        )
        response = requests.get(url)
        print(url)
        if response.status_code == 200:
            return json.loads(response.text)
        raise Exception(
            f"Failed - status code {response.status_code}. Error: {response.reason}"
        )
    
    def get_seasons(self):
        api_json = self.run_request("seasons", limit=200, offset=0)
        seasons =  api_json["MRData"]["SeasonTable"]["Seasons"]
        seasons_desc = sorted(seasons, key=itemgetter('season'), reverse=True)
        return seasons_desc 
    
    def get_rounds_for_season(self, season):
        api_json = self.run_request(resource=season)
        season_rounds = api_json["MRData"]["RaceTable"]["Races"]
        season_rounds = [{"circuitId": x["round"], "circuitName": x["raceName"]} for x in season_rounds]
        return season_rounds

    def get_season_round_results(self, season, round_no):
        api_json = self.run_request("results", season=season, round_no=round_no)
        return api_json["MRData"]["RaceTable"]["Races"]
    
    def get_laps_for_round(self, season, round_no, lap_no):
        api_json = self.run_request(resource="laps",season=season, round_no=round_no, limit=2000, offset=lap_no)
        return api_json["MRData"]["RaceTable"]["Races"][0]["Laps"]

