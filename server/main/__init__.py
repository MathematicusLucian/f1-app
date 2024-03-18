# -*- coding: utf-8 -*-
from flask import Flask
from server.main.utils.common import register_blueprints
from server.settings import config

def create_app(config_type, package_name, package_path):
    app = Flask(__name__, instance_relative_config=True)
    # app_settings = os.getenv('APP_DEV_SETTINGS')
    app_settings = config[config_type]
    app.config.from_object(app_settings)
    # To access config variables e.g. app.config['DEBUG']
    register_blueprints(app, package_name, package_path)
    return app
