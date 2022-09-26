#FROM node:16.17.0-alpine3.14 as build
#WORKDIR /app
#
#RUN npm install -g @angular/cli
#
#COPY ./package.json .
#RUN npm install
#COPY . .
#RUN ng build
#FROM nginx as runtimeco
#COPY --from=build /app/dist/angulartodo /usr/share/nginx/html

#FROM nginx:alpine
#EXPOSE 80
#COPY /dist/angulartodo /usr/share/nginx/html

FROM node:16.17-alpine AS build
WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/angulartodo /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

#FROM node:alpine AS builder
#WORKDIR /app
#COPY . .
#
#RUN npm install && \ npm run build
#
#FROM nginx:alpine
#COPY --from=builder /app/dist/* /usr/share/nginx/html/
#COPY /nginx.conf /etc/nginx/conf.d/default.conf
