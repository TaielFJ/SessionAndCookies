const {validationResult} = require('express-validator')
const {users, writeUsers} = require('../data/data');

module.exports = {
    index: (req, res) => {
        res.render('index', {
            title: 'express',
            session:req.session
        })
    },
    processIndex: (req, res) => {
        let errors = validationResult(req);
    
        if(errors.isEmpty()){
            req.session.usuario = { ...req.body};
            if(req.body.remember){
                const TIME_IN_MILISECONDS = 60000;
                res.cookie('trabajo', req.session.usuario, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true,
                });
            }
            res.locals.usuario = req.session.usuario

            res.render('hola', {
                title: 'hola',
                session: req.session
            })
        } else {
            res.render('index', {
                errors: errors.mapped(),
                old: req.body,
                title: 'hola',
                session: req.session
            });
           
    }
},
    sessionDestroy: (req, res) => {
        req.session.destroy();
        if(req.cookies.trabajo){
            res.cookie('trabajo', "", {maxAge: -1})
        }
        res.redirect('/')
    }
}