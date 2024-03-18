"""
Test Suite:
python test_suite tests
python test_suite tests_with_coverage
"""
import unittest
from coverage import coverage
from flask_script import Manager
from server.main import db
from server.main.api import create_app_blueprint
from server.main.models.user import User

COV = coverage(
    branch=True,
    include='main/*',
    omit=[
        '__init__.py',
        'main/*/__init__.py'
        'main/import_policy/*'
        'main/models/*'
        'main/static/*'
        'main/templates/*',
        'settings.py',
        'tests/*',
        'wsgi.py'
    ]
)

COV.start()

# create flask application instance
app = create_app_blueprint('development')
manager = Manager(app)


@manager.command
def tests(): # Run tests
    test_suite = unittest.TestLoader().discover('tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(test_suite)
    if result.wasSuccessful():
        return 0
    return 1

@manager.command
def tests_with_coverage(): 
    tests = unittest.TestLoader().discover('tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        COV.report()
        COV.html_report(directory='tests/coverage')
        COV.erase()
        return 0
    return 1

@manager.command
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@manager.command
def seed_db():
    db.session.add(User(
        username='tester',
        email='test@gmail.com',
        password='tester'
    ))
    db.session.add(User(
        username='admin',
        email='admin@gmail.com',
        password='admin'
    ))
    db.session.commit()

if __name__ == '__main__':
    manager.run()