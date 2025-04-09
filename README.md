# Grupo Reditos Test

## General Considerations

1. The frontend will run by default on port 5173 and the backend API will run on port 3000. Make sure you have these ports free or if you wish you can change these ports in the respective files.
2. The path to the API documentation (made with Swagger) is **"http://localhost:3000/documentation ”**.
3. The database was worked on using the **"Code First ”** programming style, but a drawing of the logical model used for the database is attached as well as a script made in **MySQL** for a better understanding of what was done. However these files are not necessary for the installation or operation of the project.
4. The unit tests were made with **“Jest"** and to run them, first go to the root of the ’backend” folder and there write the command **"npm test”**. To generate the results of the unit tests and their coverage run the command **"npm run test -- --coverage ‘**, after this inside the backend folder a folder called **’docs ”** will be generated and inside it there will be an xml file with the results. In the same way if you want to see the results in html in your browser, after executing the previous command, you can execute this command according to your OS:

 
   A. Windows: start coverage coverage “coverage-report” index.html
  
   B. MAC: open coverage/lcov-report/index.html
   
   C. Linux: xdg-open coverage/lcov-report/index.html

5. Other considerations: roles are handled as a column within the user table and there are only two allowed values **"user ‘** and **’admin ”**.

Before installing this project, you need to install the following dependencies:

1. **MySQL 9.0.1** or any later version.
2. **Node.js 22.13.1** or any later version.

**Note:** To run this project, you must ensure that MySQL is running on port 3306, the root user is "root", and the corresponding password is "root". You must also create an empty database with the name "reditos _test". However, if you want to change the database configuration, remember to modify the file `/backend/app.module.ts` so that the REST API connects correctly with the database.

## Dependencies used

### Backend

1. **@nestjs/common 11.0.1**
2. **@nestjs/core 11.0.1**
3. **@nestjs/jwt 11.0.0**
4. **@nestjs/passport 11.0.5**
5. **@nestjs/platform-express 11.0.1**
6. **@nestjs/swagger 11.0.3**
7. **@nestjs/typeorm 11.0.0**
8. **bcryptjs 2.4.3**
9. **class-transformer 0.5.1**
10. **class-validator 0.14.1**
11. **mysql2 3.12.0**
12. **passport 0.7.0**
13. **passport-jwt 4.0.1**
14. **reflect-metadata 0.2.2**
15. **rxjs 7.8.1**
16. **swagger-ui-express 5.0.1**
17. **typeorm 0.3.20**

### Frontend

1. **@date-io/date-fns 3.2.0**
2. **@emotion/react 11.14.0**
3. **@emotion/styled 11.14.0**
4. **@mui/icons-material 6.4.1**
5. **@mui/material 6.4.1**
6. **@mui/x-date-pickers 7.26.0**
7. **@tanstack/react-query 5.64.2**
8. **axios 1.7.9**
9. **dayjs 1.11.13**
10. **deep-object-diff 1.1.9**
11. **formik 2.4.6**
12. **jwt-decode 4.0.0**
13. **lodash 4.17.21**
14. **react 18.3.1**
15. **react-dom 18.3.1**
16. **react-router-dom 7.1.3**
17. **react-toastify 11.0.3**

## Installation

### On Linux/macOS

Navigate to the root of the project, give execution permissions to the **setup.sh** file and execute it.

### On Windows

Option 1: You can open the project with GitBash and, from the root of the project, run the **setup.sh** file.

Option 2: Open a terminal located in the **frontend** folder and another in the **backend** folder, and run both projects using npm: for **backend** run **npm install** first and then **npm run start:dev**. And for **frontend** run **npm install** first and then **npm run dev**.
