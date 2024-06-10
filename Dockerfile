FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install
RUN npm install -g json-server

COPY . .

COPY start.sh .

RUN chmod +x start.sh

EXPOSE 4200
EXPOSE 4000

CMD ["./start.sh"]
