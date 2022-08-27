const cookieSession = (req, res, next) => {
    if(typeof req.cookies !== "undefined"){
        if(req.cookies.trabajo){
            req.session.user = req.cookies.trabajo;
        }
        next();
    }
}

module.exports = cookieSession;