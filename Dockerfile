FROM node:7.9.0

RUN apt-get update
RUN apt-get install -y python-dev
RUN curl -O https://bootstrap.pypa.io/get-pip.py
RUN python get-pip.py
RUN pip install awscli

COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app

RUN yarn

COPY . /app/

ENV NODE_ENV production

EXPOSE 6060
