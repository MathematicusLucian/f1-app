# f1-stats UI and API
### Angular, Flask, Docker.

Features:
- Project structure supports multiple Dev environments with the usage of `.env` variable and `docker.compose.yml` files.
- Optimised for large scale app structure, with `Blueprints`, `application factory` and several configs that can be extended from this seed project to any Prod-ready app.
- Flask code Testing.
- Reverse proxy (`nginx`.)

It is built with following components:
- Angular - Front-End JavaScript framework.
- Docker - Employed Docker Compose to build and host app.
- Flask - Back-End Python framework.
- nginx - web server, and reverse proxy. External user hits the nginx - distributes request to UI or Server.
- uwsgi - WSGI server - direct support for popular NGINX web server.

## Project Directory

### docker-compose.yml

To create the containers and run the app. Several versions, i.e. for different environments.

### .env File

(Wouldn't usually commit this.) Environment variables for Flask and SQLite3. Several versions, i.e. for different environments.

### nginx

nginx config file, and Dockerfile for running the nginx container which serves the Angular code and passes requests to Flask-based API.

### server

**Flask** app, **tests** setup, configs and settings files, Dockerfile for running the Flask container, etc..

### ui

Angular code.

## Architecture

3 Docker containers built using separate Dockerfiles, created and connected with Docker Compose, and which expand upon the respective official images from Docker Hub:
- FLASK - Flask web application with _uwsgi_ server.
- NGINX - Web Server

### Requests

External requests hit the _nginx_ web server's port 80, and the response is by Angular or Flask depending on the **URL**. 
- _/api_ is sent to Flask docker container (port 5000; as per the _nginx.conf_ file. nginx is aware of both the Angular and Flask services.) 
- **Future feature to implement:** Flask container connects via port 1234 to the database.

## Running the App

**NOTE**: [Angular Prerequisites] (https://github.com/angular/angular-cli#prerequisites): Docker, node, npm and angular-cli.

- Navigate to the `ui` directory. 
Execute `ng build --prod` to create a production build for Angular.
- Navigate back to the parent. Execute following commands:
  - `docker-compose -f docker-compose.yml up --build`
  - Without cache `docker-compose build --no-cache`
- Open Browser and type following URL:
- `localhost` - It should display the Welcome message from Angular and a default message from
  backend.
- `localhost/api` - It should display welcome message from Flask.
- `localhost/api/ping` - To get a `json` from Flask.

## Running the Tests:

- Flask (Python) unit tests are in the `server/tests` directory and managed by `manage .py` Python file.
- Run with:
  - `docker-compose -f docker-compose.yml run --rm f1_stats_flask python manage.py test`