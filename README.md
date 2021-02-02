# Slack Endpoint Monitor

Slack Endpoint Monitor is a simple app that monitors the availability of your http(s) endpoints. If an endpoint is unreachable or is throwing http errors, the app sends a notification to a slack channel - @mentioning the concerned individuals.

The app and its dependencies are built into a `docker` image to aid re-useability and portability.

I have also added `Kubernetes` deployment manifests that can be used to orchestrate and scale out the deployments.

## High Level Architecture

![slack](https://user-images.githubusercontent.com/2548160/105513735-9487a980-5cca-11eb-8eb1-5a0b74dfd147.png)

## Demo 

<i> Pro Tip: Right-Click the GIF and "Open in new Tab" or view on <a href="https://terminalizer.com/view/c3456fc44582">terminalizer</a> </i>

![DEMO](https://github.com/iogbole/slack-endpoint-mon/blob/main/docs/demo.gif)

## Dependencies
 - [@slack/web-api](https://www.npmjs.com/package/@slack/web-api) - for slack notifications
 - [node-monitor](https://www.npmjs.com/package/node-monitor) - an availability monitor.
 
## Setup Instruction

There are three ways to run this app:
- Locally on your PC or a VM
- In a docker container
- Kubernetes

### Local Run

1. Download the repo: `git clone https://github.com/iogbole/slack-endpoint-monitor.git`

2. cd into the repo and install npm packages: `cd slack-endpoint-monitor && npm install`

3. Rename `.env.empty` to `.env` and fill in your slack `token` and `channelid`

4. List all endpoints that you want to monitor in `endpoints.js`. The `interval` property is the polling interval in minutes.  

5. Run `npm start` command to start monitoring your endpoints.

### Docker Container

1. Download the repo

3. Build the Image:
   - ARM 32 Processor:
        - If your Docker runtime or Kubernetes is on running on an ARM32 chip such as the Raspberry Pi
        - Edit the `build_ARM_image.sh` by specifying your image registry and/or handle.
        - Run `./build_ARM_image.sh` to build the image and push to your registry.

     Alternatively you may ignore all the instructions above and use my arm based image instead by executing:

        `docker pull iogbole/slack-endpoint-mon:arm`

   - x68/x86 Processors:
       - The same instruction as the ARM, but use the `build_image.sh` instead <br>
     OR grab mine `docker pull iogbole/slack-endpoint-mon`
### Running from Kubernetes 
cd to the `kubernetes` folder and use the following steps to deploy it your cluster: 
- Create a secret with your token: 
    `kubectl create secret generic slack-oauth-token --from-literal=token=xoxb-..`
- Add your Channel ID to `configmap.yaml`
- Then apply: `kubectl apply -f .`
