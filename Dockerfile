FROM node:15.12.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start-server"]
