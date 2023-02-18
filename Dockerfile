FROM node:18 AS development

# Create app directory
WORKDIR /opt/app

COPY package.json .
COPY package-lock.json .
COPY settings.json .
RUN npm ci
COPY . . 

FROM development AS builder

RUN npm run build

FROM development AS dev-envs

CMD npm run dev -- --host --port 80

FROM nginx:1.21.3-alpine

COPY --from=builder /opt/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

