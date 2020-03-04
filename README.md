#### Link shortener created using Mongo + Express + React + Node.js

Required environment variables:

```bash
APP_SERVER_PORT=<application server port>
JWT_SECRET=<JWT secret>
MONGO_DB_URL=<Mongo DB URL>
BASE_URL=<URL used for short links>
```

Install server dependensies

- `npm install`

Install client dependensies and build

- `npm run client:install`
- `npm run client:build`

Start server

- `npm run start`

Start as a daemon using pm2:

- `pm2 start npm -- start`

Start backend + frontend dev server concurrently:

- Add proxy to client config _client/package.json_:
  `"proxy": "http://localhost:<your port>"`
- `npm run dev`

Build and run using Docker

- `docker build -t node-demo .`
- `docker run --env-file .env --name node-demo -p 5000:5000 node-demo`
