# Base image
FROM node:8

# Set working directory
RUN mkdir -p /trello_clone/www
WORKDIR /trello_clone/www

# Add `/trello_clone/www/node_modules/.bin` to $PATH
ENV PATH /trello_clone/www/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /trello_clone/www/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# Start app
CMD ["npm", "start"]
