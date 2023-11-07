# tfg-assignment

## RabbitMQ
 It has been hosted on AWS EC2 and can be connected using `amqp://user:Pawan@4321@13.127.212.137:5672/node_project`
 
 amqplib npm module has been used to leverage RabbitMQ features

 Publisher and Subscriber has been set up in app.js file and log file can be found in /asset/userRegister.log


## MySQL
 It has been hosted on AWS EC2 and can be connected with below credentials

    host: '13.127.212.137',
    user: 'user',
    password: 'Pawan@8527344098',
    database: 'testdb',

 MySQL has been used for users table and can be found in /models/users.js

## MongoDB
 It has been hosted on MongoDB Atlas Free Tier
 It can be connected using below string
  'mongodb+srv://Pawansays:lpu@11708503@cluster0.3bebrmt.mongodb.net/?retryWrites=true&w=majority'

 MongoDB has been used for GameData collection and can be found in /models/GameData.js


## Middleware
 1. Role Based Access Control
    Using JWT npm module, authentication has been implemented. 
    ExpressJs' framework has been used for implenting custom middleware

    Auth function can be found in middleware directory

 2. Validation Check for Paylod
    

## user-registration
  There are following endpoints available for user
  1. create user 
     Helper service is being implemented to check required params and response accordingly.
     user is being stored in mysql user table with unique email only.
     Password is being hashed with bcrypt module
     It returns created user and token (JWT) needs to be passed with every further endpoints


  2. Login 
     Helper service is being implemented to check required params and response accordingly.
     First it finds the user in user table and then compare the stored hashed password with newly hashed password.
     It everything matches, it returns with token that needs to be passed in next apis.

## game-entry

    Auth check has been implemented globally in app.js file for below end-points
  1. create entry
     Before accessing this api, user needs to be authenticated first.
     It add the new entry in MongoDB's GameData collections.
     It has 'isActive' flag for soft deletion. By default isActive is true for every document.

  2. fetch game entry
     Before accessing this api, user needs to be authenticated first.
     It returns with user's game entry after finding document with email keyword. Email can be parsed from JWT token and not need to be passed from frontend.

 3. Update game entry
     Before accessing this api, user needs to be authenticated first.
     User can only modify their own entry

 4. Delete game entry
    Before accessing this api, user needs to be authenticated first.
    User can only delete their document. This api supports both kind of deletion - Hard or Soft

## util
    This directory consists of following files
    1. common.js
        It consist of common functions that can be used anywhere without need to write again
        It consist of structured api response for success, failure, any other server or db issue
    
    2. constant.js
        It consist of api response codes
        Other static thing can also be mentioned in this file like url,filepath etc.






     
    

   
     


