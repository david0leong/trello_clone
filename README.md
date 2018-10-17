# Trello Clone

This is a Trello Clone web app built by David Leong.

## Requirements

- boards APIs - CRUD operations (each board has a name / title)
- columns APIs - CRUD operations (each column belongs to a board and will have a name / title)
- tasks APIs - CRUD operations (each task belongs to a column and will have a name / title)
- basic UI that will use these APIs (nothing fancy)
- Allow reordering of items from an application that will use this API (the
  order must be persisted in the DB). Can skip UI for dragging items if
  desired, but API endpoints must support this

## Frameworks And Libraries Used

- Rails 5 for building APIs
- React v16 for building front-end app
- Axios for calling api endpionts
- antd for building UI
- Redux
- React-router v4
- Redux-saga
- normalizr for normalizing nested data
- redux-actions for redux utilities
- reselect and re-reselect for memoized selectors

## How to run the app

This app is composed in multi-services using Docker compose.

### Install Docker

Please reference Docker documentation for installing docker.

### Build Docker Development Environment

```bash
$ docker-compose build
```

### Create database

```bash
$ docker-compose run --rm api rake db:create
```

### Run Local Docker Development Environment

```bash
$ docker-compose up
```

### Enjoy the app

Go to `http://localhost:8000` in your browser.

The API is hosted on `http://localhost:3000`.

## Run API Unit Tests

```bash
$ docker-compose run api rails test
```
