FROM node:15.3.0-alpine3.12

# Workdir gets created no need to create it 
WORKDIR /usr/src/app 
COPY package*.json ./

RUN npm install --production && \
    rm package-lock.json

COPY . ./

RUN apk --update --no-cache add ca-certificates
RUN apk --update --no-cache upgrade
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
RUN rm -rf /usr/local/lib/node_modules/npm/ /usr/local/bin/npm

USER node
EXPOSE 9091

CMD ["node", "--use-openssl-ca", "server.js"]
