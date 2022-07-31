FROM node:16.16.0 AS base

ENV NAME="Alice Smith"
ENV EMAIL="alice@example.com"
ENV HREF="https://example.com"
ENV GITHUB="https://github.com/dylhack"
ENV BIKE="https://cyclers.app"
ENV TITLES='["Title A", "Title B", "Title C"]'
EXPOSE 3000

WORKDIR /opt/app
COPY package.json /opt/app

RUN npm install

##################
FROM base AS build

COPY . /opt/app
RUN npm run build

WORKDIR /opt/app 

##################
FROM build AS prod

COPY --from=build /opt/app /opt/app

CMD npm run start
