# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request
from server.main.ergast import Ergast

route = Blueprint('default', __name__)
ergast = Ergast()

@route.route("/api")
def hello():
    return "f1-stats Flask API"

@route.route("/api/ping")
def ping():
    return jsonify({"status": 200, "msg":"I am the f1-stats Flask API"})

# /api/seasons
@route.route("/api/seasons")
def get_seasons():
    return ergast.get_seasons()

# /api/rounds_for_season?season=2008
@route.route("/api/rounds_for_season")
def get_rounds_for_season():
    season_rounds = request.args.get('season')
    return ergast.get_rounds_for_season(season_rounds)

# /api/round_results?season=2008&round_no=5
@route.route("/api/round_results")
def get_season_round_results():
    season = request.args.get('season')
    round_no = request.args.get('round_no')
    return ergast.get_season_round_results(season, round_no)

# /api/laps_for_round?season=2008&round_no=5
@route.route("/api/laps_for_round")
def get_laps_for_round():
    season = request.args.get('season')
    round_no = request.args.get('round_no')
    return ergast.get_laps_for_round(season, round_no, 1)