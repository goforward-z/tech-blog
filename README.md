# tech-blog
![License Badge](https://img.shields.io/github/license/goforward-z/tech-blog) ![Top Language](https://img.shields.io/github/languages/top/goforward-z/tech-blog)

## Description 
This project is a CMS-style blog where developers can publish their blog posts and comment on other developers post. This application follows the MVC paradigm in it's structure and uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. 

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation 
The user should clone the repository from GitHub. This application requires Node.js, Express.js, Sequelize, mysql2, connection-session/express-session, and  Jest. If cloning the repo, run npm i to run all modules. To connect to the database run mysql -u root -p and enter password from .env file. Then source the schema.sql. To connect to the server run npm start. 

## Usage 
This application will allow users to sign up if they are not a member, then once they are logged in they are able to view their dashboard of posts to view, add, edit, and delete blog posts and comment on other developers post. <br>
Please view deployed live Heroku [URL](https://whispering-sands-76106.herokuapp.com/).<br>
<img src="assets/images/tech.png">

## License 
This project is license under MIT

## Contributing 
Contributors should read the installation section. 

## Tests
The tests in this application verifies data formatting using Jest.  

## Questions
You can view more of my projects at https://github.com/goforward-z