# build stage
FROM node:lts-alpine as build-stage

WORKDIR /temp

# Copying package files and installing dependencies
COPY package.json yarn.lock .
RUN yarn install --registry=https://registry.npmmirror.com/ --frozen-lockfile && yarn cache clean --force

# Copying source files and building the application
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine as production-stage

# Clearing the nginx default directory
RUN rm -rf /usr/share/nginx/html/*

# Copying only necessary files from build-stage
COPY --from=build-stage /temp/dist /usr/share/nginx/html
COPY --from=build-stage /temp/survey-design.conf /etc/nginx/conf.d

# Exposing the right port
EXPOSE 3006

# Since we are using an Nginx image, it will start Nginx automatically,
# but we can still specify the command explicitly
CMD ["nginx", "-g", "daemon off;"]
