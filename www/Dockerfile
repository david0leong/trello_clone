# Base image
FROM node:8

# Set working directory
RUN mkdir -p /trello_clone/www
WORKDIR /trello_clone/www

# Add `/trello_clone/www/node_modules/.bin` to $PATH
ENV PATH /trello_clone/www/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /trello_clone/www/package.json
COPY yarn.lock /trello_clone/www/yarn.lock

RUN npm install yarn -g --silent
RUN npm install create-react-app -g --silent
RUN yarn

# Start app
CMD ["yarn", "start"]
