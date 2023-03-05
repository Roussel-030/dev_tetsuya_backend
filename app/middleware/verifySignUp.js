const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Echec! Le nom de l'utilisateur est déjà utilisé!"
            });
            return
        }

        //Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(user) {
                res.status(400).send({
                    message: "Echec! L'adresse est déjà utilisé!"
                });
                return
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Echec! Le role "${req.body.roles[i]}" n'existe pas`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;