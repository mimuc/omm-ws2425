FROM mongo:latest
 COPY . .
 CMD mongoimport --collection users --file usersdata.json --jsonArray --uri "mongodb://mongo:27017/omm-2021"
