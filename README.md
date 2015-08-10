# myRecruitmentService

## Dependencies and Tools
* mongodb
  - ```brew install mongodb```
* node
  - ```brew install node```
* mongodb node helper
  - ```npm install mongodb```
* expressjs
  - ```npm install express```
* body-parser
  - ```npm install body-parser```
* mongo-express
  - ```npm install mongo-express```

## Getting Things Going
1. Set up local database
  - ```mkdir -p data/db``` In the directory where you want the database
  - ```mongod --dbpath /path/to/directory/data/db```
2. View local database
  - ```node ~/node_modules/mongo-express/app```

## Run
* ```node app```
  - Running at ```http://localhost:8080```

## Tests
### Dependencies
* ```npm install assert```
* ```npm install supertest```
* ```npm install should```
* ```npm install express```
* ```npm install body-parser```
* ```npm install mocha```
### Run Tests
* ```mocha tests/functional/serviceTest```
