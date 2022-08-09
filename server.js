//GMS our server is essentially going to be boilerplate, im using 3000 because i always type it in naturally but we can change if need be

const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const exphbs = require("express-handlebars")
const comments = require('./routes/comments')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: 'Protected access pages',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({});
app.use(express.static("public"))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
