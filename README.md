# Trello Clone

## Requirements

- boards APIs - CRUD operations (each board has a name / title)
- columns APIs - CRUD operations (each column belongs to a board and will have a name / title)
- tasks APIs - CRUD operations (each task belongs to a column and will have a name / title)
- basic UI that will use these APIs (nothing fancy)
- Allow reordering of items from an application that will use this API (the
  order must be persisted in the DB). Can skip UI for dragging items if
  desired, but API endpoints must support this

## How to run

### Install Docker

### Build Docker Development Environment

```bash
$ docker-compose build
```

### Create database

```bash
$ docker-compose run --rm web rake db:create
```

### Run Local Docker Development Environment

```bash
$ docker-compose  up
```
