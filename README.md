# idc-todo

##steps to start project

1.create a .env file in root directory and add followings :- 

PORT=5000
MONGODB_URI_LIVE=mongodb://localhost/validation
MONGODB_URI_TEST=mongodb://localhost/validation
JWT_SECRET=askldfjalsro238490184391vcskljflkaj$@#$sdf
CLIENT_URL=http://localhost:3000

2. "npm install" on root directory
3. cd client/
4. run "npm install" inside client directory
5. run "npm run build" 
6. go back to root directory using "cd ../"
7. run "mongod"
8. run "npm start"
9. go to localhost:5000/


##features
1. Authentication using JWT token.
2. DataBase as Mongo DB using mongoose ODM.
3. user can use Remember me feature for prefilling email and password.
4. Basic validation added for login and signup.
5. After login user can create todo task.
6. todo task can be viewed and deleted.
7. user can search todo using search.
8. user can edit their email and name.
