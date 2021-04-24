FROM node:15.3.0-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . ./

RUN npm install --production && \
    rm package-lock.json

RUN apk --update --no-cache add ca-certificates
RUN apk --update --no-cache upgrade
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
RUN rm -rf /usr/local/lib/node_modules/npm/ /usr/local/bin/npm

USER 65001:65001
EXPOSE 9091

CMD ["node", "--use-openssl-ca", "server.js"]
