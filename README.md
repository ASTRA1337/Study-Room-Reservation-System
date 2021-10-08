# Study-Room-Reservation-System
To begin working on the project:
1. Clone the project to your computer. If you are new to github, search how to clone the project in Github
2. After cloning, navigating to the project in your computer, run the following command (at the root of your project folder):
    npm install
    If you don't have npm, search how to install npm (Node Package Manager)
3. Then, at the root of your project folder, run:
    npm start
    This will start the website

## Node.js Server:
To setup Node.js server:  
At the root of the project (using terminal or command prompt):  
1. Type: cd server/  # navigate to the "server" folder  
2. Type: npm install # This will install server dependency  
3. Type: cp server_database_example.js server_database.js # create a copy of server_database_example.js named server_database.js  
4. Open the server_database.js and modified the configuration based on your mysql connection  
5. Type: npm start # This will start the server  

## MySQL Server:
Using command line (terminal) to login to your mysql server:

1. Type: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';  
2. Type: FLUSH PRIVILIGES;  
