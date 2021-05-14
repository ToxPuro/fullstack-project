# optimizations for 3.7

FROM node:15-alpine3.10 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build

FROM node:15-alpine3.10

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --production && adduser -D appuser

USER appuser

COPY --from=builder /usr/src/app/backend /usr/src/app/backend

CMD ["npm", "run", "start-server"]

## before:

##FROM node:15.12.0

##WORKDIR /usr/src/app

##COPY . .

##RUN npm install

##RUN npm run build

##EXPOSE 4000

##CMD ["npm", "run", "start-server"]