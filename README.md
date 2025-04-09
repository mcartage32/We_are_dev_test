# We are dev Test

## General Considerations

1. The frontend will run by default on port 5173 and the backend API will run on port 3000. Make sure you have these ports free or if you wish you can change these ports in the respective files.
2. The database used was MySQL.
3. The path to the API documentation (made with Swagger) is **"http://localhost:3000/documentation ”**.

Before installing this project, you need to install the following dependencies:

1. **MySQL 8.4.4** or any later version.
2. **Node.js 22.14.0** or any later version.

**Note:** To run this project, you must ensure that MySQL is running on port 3306, the root user is "root", and the corresponding password is "root". You must also create an empty database with the name "we_are_dev_test". However, if you want to change the database configuration, remember to modify the file `/backend/app.module.ts` so that the REST API connects correctly with the database.

## Installation

### On Linux/macOS

Navigate to the root of the project, give execution permissions to the **setup.sh** file and execute it.

### On Windows

Option 1: You can open the project with GitBash and, from the root of the project, run the **setup.sh** file.

Option 2: Open a terminal located in the **frontend** folder and another in the **backend** folder, and run both projects using npm: for **backend** run **npm install** first and then **npm run start:dev**. And for **frontend** run **npm install** first and then **npm run dev**.
