# react-front

This is **front-end** for service of my repository`s **Gaeddal_api**.

## Skils

This project skils **React Hooks**,**Redux**,**Redux-saga**.

# Getting Started

## Prepared

### Install

- Node.JS : [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- MySQL : [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

This project`s api server is using MYSQL database setting.

```
// in gaeddal_api/config.js

name: process.env.DATABASE_NAME || 'gaeddal',
user: process.env.DATABASE_USER || 'root',
password: process.env.DATABASE_PASSWORD || 'test',
host: process.env.DATABASE_HOST || 'localhost',
```

> go [GAEDDAL_API](https://github.com/BBackJK/gaeddal_api.git)

if you start this project, you start with the database settings first.
In other words, you need to install mysql and create the **gaeddal** database.

and then,

```
// in your workspace root folder..
git clone https://github.com/BBackJK/react-front.git
cd react_front/
npm install
npm start

and then,

cd ../  // your workspace root folder..
git clone https://github.com/BBackJK/gaeddal_api.git
cd gaeddal_api/
npm install
npm start
```

# Reference

if you want to know all api of gaeddal_api project, you connect http://localhost:8000/docs.

# Other Scripts

If you want to build react-front project

```
npm run build
```
