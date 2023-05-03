FROM node:18-alpine

RUN mkdir -p /app/

ADD . /app/
WORKDIR /app/
RUN npm i

EXPOSE 3000

CMD [ "npm", "start"]