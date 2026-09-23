FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY bot.js ./
COPY index.html /usr/share/nginx/html/index.html

RUN apk add --no-cache nginx

RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ =404; } }' > /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["sh", "-c", "node bot.js & nginx -g 'daemon off;'"]
