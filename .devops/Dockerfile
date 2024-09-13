FROM node:lts as base-builder

RUN node -v
RUN npm -v

WORKDIR /app/
COPY package*.json /app/

# RUN yarn install --verbose
#RUN npm install
Run npm install --force

ENV PATH="./node_modules/.bin:$PATH"
COPY . /app/

WORKDIR /app/

ARG BUILD_TYPE

ENV TZ $TZ
ENV BUILD_TYPE $BUILD_TYPE

RUN npm run build:$BUILD_TYPE


FROM nginx:alpine

WORKDIR /app

COPY --from=base-builder /app/dist/mega-ex-admin-panel /app

ARG TZ
ENV TZ $TZ

RUN echo " \
    server { \
        listen 80 default_server; \
        listen [::]:80 default_server; \
        index index.html; \
        root /app/; \
        \
        location = /favicon.ico { \
            allow all; \
            log_not_found off; \
            access_log off; \
        } \
        \
        location = /robots.txt { \
            allow all; \
            log_not_found off; \
            access_log off; \
        } \
        \
        location ~* \.(jpg|jpeg|gif|css|png|js|ico|html|svg)$ { \
            access_log off; \
            expires max; \
            log_not_found off; \
        } \
        \
        location / { \
            try_files \$uri \$uri/ /index.html?\$query_string; \
        } \
    }" > /etc/nginx/conf.d/default.conf



RUN echo " \
    user nginx; \
    error_log /dev/stderr error; \
    \
    events {} \
    \
    http { \
        include /etc/nginx/mime.types; \
        default_type application/octet-stream; \
        \
        log_format json_combined escape=json \
          '{' \
            'time_local:\$time_iso8601,' \
            'client_ip:\$http_x_forwarded_for,' \
            'remote_addr:\$remote_addr,' \
            'remote_user:\$remote_user,' \
            'request:\$request,' \
            'status:\$status,' \
            'body_bytes_sent:\$body_bytes_sent,' \
            'request_time:\$request_time,' \
            'http_referer:\$http_referer,' \
            'http_user_agent:\$http_user_agent,' \
            'request_id:\$request_id' \
          '}'; \
        access_log /dev/stdout json_combined; \
        \
        sendfile            on; \
        tcp_nopush          on; \
        tcp_nodelay         on; \
        keepalive_timeout   180; \
        types_hash_max_size 2048; \
        \
    #    allow 157.90.139.103; \
        charset 		utf-8; \
        \
        client_max_body_size 100m; \
        reset_timedout_connection on; \
        client_body_timeout 600s; \
        client_body_buffer_size 256k; \
        \
        index       	index.php; \
        \
        # add_header Cache-Control ""public, max-age=7200""; \
        add_header X-Frame-Options SAMEORIGIN; \
        add_header X-Content-Type-Options nosniff; \
        # add_header X-XSS-Protection ""1; mode=block""; \
        add_header X-Robots-Tag none; \
        add_header X-Download-Options noopen; \
        add_header X-Permitted-Cross-Domain-Policies none; \
        \
        # don't cache it \
        proxy_no_cache 1; \
        # even if cached, don't try to use it \
        proxy_cache_bypass 1; \
        \
        # kill cache \
        add_header Last-Modified \$date_gmt; \
        add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'; \
        if_modified_since off; \
        expires off; \
        etag off; \
        \
        proxy_hide_header X-Powered-By; \
        proxy_hide_header Content-Security-Policy; \
        proxy_hide_header X-Frame-Options; \
        proxy_hide_header X-Content-Type-Options; \
        proxy_hide_header X-XSS-Protection; \
        proxy_hide_header X-Requested-With; \
        \
        open_file_cache max=200000 inactive=20s; \
        open_file_cache_valid 24h; \
        open_file_cache_min_uses 5; \
        open_file_cache_errors on; \
        \
        keepalive_requests 	512; \
        \
        gzip		on; \
        gzip_static 	on; \
        gzip_disable 	""MSIE [1-6]\.""; \
        gzip_min_length 	1000; \
        gzip_vary 		on; \
        gzip_proxied	any; \
        gzip_comp_level 	9; \
        gzip_buffers 	16 8k; \
        gzip_http_version 	1.1; \
        gzip_types 		text/plain text/css text/js application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript text/x-js; \
        \
        server_tokens       off; \
        autoindex 		off; \
        \
        proxy_read_timeout 600; \
        proxy_connect_timeout 600; \
        proxy_send_timeout 600; \
        proxy_buffers 16 16k; \
        proxy_buffer_size 16k; \
        proxy_max_temp_file_size 0; \
        proxy_redirect off; \
        proxy_buffering off; \
        \
        include /etc/nginx/conf.d/*.conf; \
    }" > /etc/nginx/nginx.conf

EXPOSE 80
