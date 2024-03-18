# -*- coding: utf-8 -*-
import unittest
from flask import current_app

from server.main.api import create_app_blueprint
from server.tests.base import BaseTestCase

class TestDevelopmentConfig(BaseTestCase):

    def create_app(self):
        return create_app_blueprint('development')

    def test_dev_config(self):
        with self.context:
            self.assertEqual(current_app.config['DEBUG'], True, msg="Dev DEBUG -  config value Equals true")
            self.assertEqual(current_app.config['TESTING'], False, msg="Dev TESTING - config value Equals false")

class TestTestingConfig(BaseTestCase):
    def create_app(self):
        return create_app_blueprint('testing')

    def test_test_config(self):
        with self.context:
            self.assertEqual(current_app.config['DEBUG'], False, msg="QA DEBUG config value Equals false")
            self.assertEqual(current_app.config['TESTING'], True,  msg="QA TESTING config value Equals true")

if __name__ == '__main__':
    unittest.main()
