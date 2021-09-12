
# Image Processing API - FSJS Project by Ibrahim Alkhowaiter

  

## Introduction

  

This is an Image Processing application that change an image size using `width×height` measure as requested from the user.

  
  

## Getting Started

  

To run the app, first download all the dependencies via:

```bash

npm i

```
or
```bash

npm i <<dependency-name>>
npm i @types/<<dependency-name>>

```
- PS: you can find the dependencies needed in `package.json` under `devDependencies` and `dependencies` tags.
  
Then create `.env` file and put the following environment variables inside it:
```.env
NODE_ENV = development
APP_PORT = 3000
LOCAL_HTTPS = false
DEBUG = app:* 
```
### To **start** the app, type:

```bash

npm run start

```

  <hr>

### To **test** the app, type:

```bash

npm run test

```
The testing done by Jasmine. There are two suites in this test, every suites has several specs. The test suites check basic functionality of the images handler helper.
<hr>

### To **build** the app (Typescript transpiring), type:

```bash

npm run build

```
The backend code is located in `server/src` folder, and the transformed output is located in `server/dist` folder, except for testing files which are located in `spec/suppor/tests` folder.
-	PS: both ``start`` and ``test`` will also run ``build``.
<hr>

### Linter/prettier

  

Code styling check and automatic fix is handled by ESLint through a Gulp task. You can execute the command below:

```bash

npm run lint

```




## Provided endpoint

  

After installing the dependencies, building and executing the project, the endpoint will be available as demonstrated below:

  

### Path

`/api/image?imageId=<<image-name>>&width=<<wanted-width>>&height=<<wanted-height>>`
<hr>
  
### Example

Consider the app is running at port 3000 on your local environment, you can access the following endpoints

* Main page (discussed below in <a style="text-decoration:none;" href="#frontend">Frontend</a> Section): [http://localhost:3000](http://localhost:3000)

* Getting the same image with custom dimensions: [http://localhost:3000/api/image?imageId=image.jpg&width=100&height=100](http://localhost:3000/api/image?imageId=image.jpg&width=100&height=100)
  
  
  
  

## Project Stack

  

### Frontend <div id="frontend"></div>
You can access the frontend via the path `/`, it has 3 inputs field, as shown below:
  

![The Frontend](https://github.com/BR19-gh/FSJS-udacity-project1-ibrahimalkhowaiter/blob/master/images/full/ss1.png)

  After entering the required fields, press `Change Now!` to see the result.
  The fronend is the `index.html` in `server/dist/views` folder, the following is what used to build the frontend:

- HTML
- CSS
- JavaScript
- Bootstrap 

<hr>

### Backend

  

-  [Node.js](https://nodejs.org/)

-  [Express.js](https://www.npmjs.com/package/express)

-  [Typescript](https://www.typescriptlang.org/)

-  [Sharp package](https://www.npmjs.com/package/sharp)

  
  <hr>

### Other tools used

  

-  [Gulp.js](https://gulpjs.com/)

-  [ESLint](https://eslint.org/)

-  [Nodemon](https://nodemon.io/)

-  [Jasmine](https://jasmine.github.io/)

-  [Swagger](https://jestjs.io/docs/)

-  [Prettier](https://www.npmjs.com/package/prettier)



## Conclusion
Thank you for reading this, hope it helps you a bit to handle your way on this app.
> Project done by **Ibrahim Alkhowaiter**
> <br>
> It was part of Udacity FSJS nano-degree program
