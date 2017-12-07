# start from base
FROM ubuntu:14.04

# install system-wide deps for node
RUN apt-get -yqq update
RUN apt-get -yqq install nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

WORKDIR /usr/src/app
COPY package*.json ./

# copy our application code
# ADD index.js /opt/index.js
# WORKDIR /opt

# fetch app specific deps
RUN npm install
# RUN npm run build # ummm should we do this?

COPY . .

# expose port
EXPOSE 3000

# start app
CMD [ "node", "./index.js" ]