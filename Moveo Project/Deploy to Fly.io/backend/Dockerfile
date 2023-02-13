# the base image
FROM node:18-alpine3.15

# create a directory inside the image and cd to it
WORKDIR /my-application

# expose the app port
EXPOSE 3001

# copy files from target to image
COPY . .

# install dependencies
RUN npm install

# build typescript
RUN npm run build

# start the application
CMD ["node", "dist/app.js"]