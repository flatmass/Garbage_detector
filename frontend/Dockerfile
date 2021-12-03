# Stage 0
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app
COPY ./frontend/package*.json /app/
COPY ./.env /app/
RUN npm install

COPY ./frontend/ /app/

RUN npm run build:stage

# Stage 1
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
