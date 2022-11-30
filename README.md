# OpenClassrooms - Web Developper - Project7 - Groupomania [![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://choosealicense.com/licenses/gpl-3.0/)

## Frontend & Backend - Mannebarth Christophe \_ 10/2022 - Web development [MERN Stack](https://www.bocasay.com/fr/quoi-mern-stack/)

# Table of contents

1. [Introduction](#introduction)
2. [Functional Specifications](#functional-specifications)
   1. [Login Page](#login-page)
   2. [Home Page](#home-page)
   3. [Create Post](#creating-a-post)
   4. [Like System](#like-system)
   5. [Administrator Role](#administrator-role)
   6. [Graphic Identity](#graphic-identity)
3. [Tech Stack](#tech-stack)
4. [Screenshots](#screenshots)
5. [Prerequisites](#prerequisites)
6. [Frontend](#frontend)
   1. [Dependencies](#dependencies)
   2. [Install & Start](#install--start)
   3. [Notice](#to-note)
7. [Backend](#backend)
   1. [Dependencies](#dependencies-1)
   2. [Preparations](#preparations)
   3. [Install & Start](#install--start-1)
   4. [Notice](#to-note-1)
8. [Thanks](#thanks)

## **Introduction:**

The project consists of building an internal social network for Groupomania employees.

The purpose of this tool is to facilitate interactions between colleagues.

The HR department of Groupomania has imagined several features to promote exchanges between colleagues.

## **Functional Specifications:**

### **Login Page**

    ● A login page allowing the user to log in, or to create an account if he does not have one.

    ● Here you have to ask for the minimum information, the connection must be made from two elements: the email of the employee, and a password.

    ● A user must be able to log out.

    ● The user's session persists while logged in.

    ● Login data must be secure.

### **Home page**

    ● The home page should list posts created by different users.

    ● We want the posts to be listed backwards (from the most recent to oldest).

### **Creating a post**

    ● A user must be able to create a post.

    ● A post must be able to contain text and an image.

    ● A user must also be able to edit and delete their posts.

### **Like system**

    ● A user must be able to like a post, only once for each post.

### **Administrator role**

    ● In order to be able to do moderation if necessary, it will be necessary to create
    an “administrator” user; this one will have the rights of modification /
    deletion on all posts on the social network. We will therefore have to
    communicate the identifiers of this administrator.

### **Graphic identity**

Font: all texts on the site must use the Lato font.
Colors: you are free on the colors, but here is our current palette
which you can draw inspiration from:

    ● Primary: #FD2D01

    ● Secondary: #FFD7D7

    ● Tertiary: #4E5166

## **Tech Stack:**

**Client:** React

**Server:** Node, Express, Mongodb

## **Screenshots:**

![Home Page](docs/home.png)

![Post Page](docs/post.png)

![Post Page tablet](docs/post-tablet.png)

## **Prerequisites:**

You will need to have [NodeJS](https://nodejs.org/en/) and npm installed locally on your machine.

You must also first create a MongoDB database on [Mongodb Atlas](https://www.mongodb.com/atlas/database) and create two empty collections there:

    one called "posts"

    and another called "users"

Here is a tutorial in French to install a database: [Mongodb tutorial](https://stacklima.com/comment-utiliser-l-atlas-mongodb-pour-sauvegarder-des-donnees/)

Then you have to download [Mongodb Compass](https://www.mongodb.com/try/download/compass), install it and connect to your database with URI retrieved from Mongodb Atlas

This URI should look like for exemple:

    mongodb+srv://aaaa:bbbb@cccc.dddd.mongodb.net/?retryWrites=true&w=majority
    ==> a = name of the user of your cluster, for exemple: groupomania_user1
    ==> b = your password
    ==> c = the name of the cluster, for exemple: oc-dw-p7-groupomania
    ==> d = code that Mongodb give to your cluster, for exemple: qbudz8p

Then go to your database (normaly named "test") and for each of your two collections (posts and users):

Click on "ADD DATA" and import the JSON file corresponding to the collection:

For the "posts" collection here is the [posts JSON file](docs/posts.json)

For the "users" collection here is the [users JSON file](docs/users.json)

Here are the identifiers for the 3 users:

**Administrator:**

    email: groupomania-admin@gmail.com
    password: Group0@dm1n!

**user Bob:**

    email: bobleponge@gmail.com
    password: Pl0p!

**user Patrick:**

    email: patrick-letoile@gmail.com
    password: Pl1p!

## **Frontend:**

### **Dependencies**

    "@hookform/resolvers": "^2.9.0",
    "@reduxjs/toolkit": "^1.8.2",
    "axios": "^1.1.3",
    "bootstrap": "^5.2.2",
    "react": "^18.1.0",
    "react-animations": "^1.0.0",
    "react-bootstrap": "^2.5.0",
    "react-bootstrap-icons": "^1.9.1",
    "react-dom": "^18.1.0",
    "react-hook-form": "^7.31.3",
    "react-medium-image-zoom": "^5.1.2",
    "react-redux": "^8.0.2",
    "react-router-dom": "^6.3.0",
    "react-scripts": "^5.0.1",
    "styled-components": "^5.3.6",
    "yup": "^0.32.11"

### **Install & Start**

Clone this repo

Open a terminal in frontend folder then run the following commands

```
npm i

npm start
```

### **To note**

_Navigate to http://localhost:3000/. The app will automatically reload if you change any of the source files._

## **Backend:**

### **Dependencies**

    "@types/bcrypt": "^5.0.0",
    "@types/crypto-js": "^4.1.1",
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.1",
    "@types/mongoose-unique-validator": "^1.0.6",
    "@types/multer": "^1.4.7",
    "@types/node": "^18.11.5",
    "nodemon": "^2.0.19",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.4"
    "bcrypt": "^5.0.1",
    "crypto-js": "^4.1.1",
    "dotenv": "^16.0.2",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.4",
    "mongoose-unique-validator": "^3.1.0",
    "multer": "^1.4.5-lts.1"

### **Preparations**

Transform the ".env.template" file into an ".env" file by following these guidelines:

    #### Connect to MongoDB ####

    DB_ACCESS = the URI to access to your database on MongoDB Atlas

    #### Secret Key for the user email encryption ####

    EMAIL_KEY = a secret key for the email

    #### Token key for the user password hashing ####

    TOKEN_KEY = a secret key for the token

    #### Server port ####

    PORT = the port of the backend server (here 8000)

    #### Environment ####

    NODE_ENV = development, testing or production (here development)

### **Install & Start**

Open a terminal in backend folder then run the following commands

```
npm i

npm start
```

### **To note**

_The images folder is present with two images for the demonstration, do not delete them otherwise the two posts of the demonstrastion will no longer be able to refer to it._

_Default port : `8000` (http://localhost:8000)_

## **Thanks:**

My thanks to my mentor [Romain Vaur](https://www.linkedin.com/in/romain-vaur/) for his patience and his expertise as well as to [OpenClassrooms](https://openclassrooms.com/) for his provision of courses

_“Any idiot can write code that a computer can understand. Good programmers write code that humans can understand.”_ - [Martin Fowler](https://fr.wikipedia.org/wiki/Martin_Fowler)

Enjoy
