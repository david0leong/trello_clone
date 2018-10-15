FROM ruby:2.5

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /trello_clone/api

WORKDIR /trello_clone/api

COPY Gemfile /trello_clone/api/Gemfile
COPY Gemfile.lock /trello_clone/api/Gemfile.lock

RUN bundle install

COPY ./entrypoints /entrypoints
RUN chmod -R +x /entrypoints

COPY . /trello_clone/api
