FROM node:16-stretch as build
#Install package dependencies
WORKDIR /app
COPY package*.json ./
RUN yarn install

#Build the JS bundle
COPY . .
RUN yarn run build

#Serve the static content using nginx
FROM nginx:1.15

RUN apt-get update &&\
	apt-get install -y gettext-base

COPY --from=build /app/dist /usr/share/nginx/html
COPY entrypoint.sh /

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
