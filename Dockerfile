FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules
RUN mkdir -p /home/node/app/client/node_modules
RUN chown -R node:node /home/node/app

# App directory
WORKDIR /home/node/app

# Copy package files for backend and frontend
COPY package*.json ./
COPY client/package*.json ./client/

# User node instead of root for security puposes
USER node

# Install packages for backend and frontend 
RUN npm install
RUN npm run client:install

# Copy sources
COPY --chown=node:node . .

# Build frontend
RUN npm run client:build

CMD [ "npm", "run", "start" ]