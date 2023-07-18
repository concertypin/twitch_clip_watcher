FROM node:18-alpine
WORKDIR /app

LABEL org.opencontainers.image.description github.com/concertypin/twitch_clip_watcher

COPY package*.json ./
RUN npm install

RUN npm install -g typescript
COPY . .
RUN tsc

CMD [ "npm", "run","startonly" ]