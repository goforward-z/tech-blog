const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');





// session (connects session to sequelize Database)
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create session 
const sess = {
    secret: "super super secret",
    cookie: { originalMaxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));




// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});