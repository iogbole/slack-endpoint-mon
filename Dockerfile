# Use this for x86/x64 Intel Processors  
FROM node:14.21.0 
# FROM arm32v7/node:10-slim # Used for arm processors - for running on Raspberry Pis for example. 
 
# Create app directory
RUN mkdir  /opt/slack-endpoint-mon
WORKDIR /opt/slack-endpoint-mon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# Bundle app source
COPY . /opt/slack-endpoint-mon/

#RUN npm install
# If you are building your code for production
RUN npm ci --only=production

EXPOSE 3000
CMD [ "npm", "start" ]