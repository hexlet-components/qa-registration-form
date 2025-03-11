FROM node:20.5.1-alpine3.18

RUN apk update
RUN apk add --no-cache bash make expect

WORKDIR /usr/app
COPY package.json /usr/app/package.json
COPY package-lock.json /usr/app/package-lock.json
RUN npm ci

COPY ./ /usr/app

RUN make build

EXPOSE 5039

CMD ["make", "start"]
