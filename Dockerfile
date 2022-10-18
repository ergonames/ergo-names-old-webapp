# develop stage
FROM node:12.22.11-alpine as develop-stage
WORKDIR /app
COPY . .
# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=develop-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]