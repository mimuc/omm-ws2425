# NodeJS + MongoDB + Docker Example Project

## How to Start

`docker-compose up`

Open `http://localhost:3000/users` in your browser.

(If you did some changes, call `docker-compose build`in advance. Otherwise they will not be applied)

The default login is username `student` and password `ommisawesome`

## Docker Containers

### Container _mongo_
 
Contains a plain MongoDB installation

### Container _nodeapp_
 
Implementes a simple NodeJS app. All routes (e.g. _/users_) require basic authentication. The login is checked with the database: The collection _users_ contains allowed Basic Auth Tokens. In _datagenerator/usersdata.json_ is a demo user created (the matching username is _student_ and password _ommisawesome_)

### Container _datagenerator_

Imports the _usersdata.json_ into the MongoDB container. (Database _omm-2021_, collection _users_)
