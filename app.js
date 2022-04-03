'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { request } = require('express');

app.use(cookieParser());
app.use(session({secret: 'vdofjisdoji'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'pug');


const userName = 'foo';
const password = 'bar';

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/logout', (req, res) => {
  req.session.loggedIn = false;
  res.send('logged out');
});

app.get('/secret', (req, res) => {
  if (req.session.loggedIn) {
    res.render('secret');
} else {
  res.send('You must login first');
  //res.redirect('/form');
}
});

app.post('/login', (req, res) => {
  //const loginOk = true; 
  console.log(req.body);
  if (req.body.username === userName && req.body.password === password) {
    req.session.loggedIn = true;
    res.redirect('/secret');
  } else {
    res.redirect('/form');
  }
});


app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr);
  res.render('home');
});

app.get('/getCookie/', (req, res) => {
  res.send('my color is:' + req.cookies.color);
});

app.get('/deleteCookie/', (req, res) => {
  res.clearCookie('color');
  res.send('cookie cleared');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

