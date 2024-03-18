from __future__ import annotations
from typing import Callable, List 
import json
import requests
from uritemplate import URITemplate
HOST = "https://ergast.com/api"
SERIES = "f1"

# pylint: disable=too-many-public-methods
class Ergast:
    def __init__(self) -> None:
        self.params = {}

    def run_request(self, season, round_no, resource, limit=None, offset=None) -> dict:
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
        if response.status_code == 200:
            api_json =  json.loads(response.text)
            return api_json["MRData"]["RaceTable"]["Races"]
        raise Exception(
            f"Failed - status code {response.status_code}. Error: {response.reason}"
        )