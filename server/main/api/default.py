# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify
route = Blueprint('default', __name__)

@route.route("/api")
def hello():
    return "f1-stats Flask API"

@route.route("/api/ping")
def ping():
    return jsonify({"status": 200, "msg":"I am the f1-stats Flask API"})