# Simple React JS Project

## What is the use of this Repo

This Project is a Simple ReactJS Project which demonstrates the following
1. Search and renders grid of Colors based on the user input

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Palette.js
1. Gets the dominant color code of an image using "usePalette" from "react-palette" library. Ref: https://www.npmjs.com/package/react-palette
2. Gets the color name of the dominant color code using "GetColorName" from "hex-color-to-color-name". Ref: https://www.npmjs.com/package/hex-color-to-color-name

#### App.js
1. Gets the list of image URL by using Google custom search API of search type "image".

## API

Method Type: GET
URL: https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSR_ID}&q=${query}&searchType=image
Params: 
    CSR_ID - custom search ID
    query - user input

Example Response:
    {
        items: {
            image: {
                thumbnailLink: "image link"
            }
        }
    }


#### Process Explanation

1. When the user enters some text in the search bar, a google custom search especially for image is processed.
2. The response of image URL are stored as an array.
3. Each image URL is then sent to Palette.js to get the respective dominant color and color name.
4. The respective dominant color and color name are iterated and created as a element, the collectable is given as the innerHTML of Masonry. Ref: https://www.npmjs.com/package/react-masonry-css
 
## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS


