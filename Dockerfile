FROM node:16-alpine3.13
RUN mkdir /app
ADD . /app/
WORKDIR /app/prometheus
RUN ["npm","install"]
CMD [ "npm","start" ]