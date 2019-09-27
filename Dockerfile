FROM node:12.7.0 as build

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.2.1

# add app
COPY . /app

RUN ng build --output-path=dist --prod

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

# run nginx
CMD ["nginx", "-g", "daemon off;"]