var express = require('express'),
    logger = require('morgan'),
    bodyparser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session);

module.exports = function (app, config) {

    app.use(logger('dev'));

    //setting up the bodyparser properties
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());

    //passport session key , initalization, session
    app.use(session({
        secret: 'mean-basic',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ url: config.db })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //this is for the static routing
    app.use(express.static(config.rootPath + '/public'));
}