#!/bin/bash 

docker build -t iogbole/slack-endpoint-mon . 

#run the image 
# docker run -p 9000:3000  --env-file .env iogbole/slack-web-mon 

#get container ID 
# docker ps 

#get logs  ID 
# docker logs -f <container-id>

#docker stop  <container-id>

# browse to :   http://localhost:9000/

#push the image 
docker push iogbole/slack-endpoint-mon

