# the base image
FROM node:18-alpine3.15

# create a directory inside the image and cd to it
WORKDIR /my-application

# expose the app port
EXPOSE 3000

# copy files from target to image
COPY ./build ./build

COPY ./web-server.js .

# install dependencies
RUN npm install express

# start the application
CMD ["node", "web-server.js"]