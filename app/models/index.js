const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.message = require("../models/message.model.js")(sequelize, Sequelize);
db.conversation = require("../models/conversation.model.js")(sequelize, Sequelize);
db.userToConversation = require("../models/userToConversation.model.js")(sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// Relation between tables
db.user.hasMany(db.userToConversation);
db.userToConversation.belongsTo(db.user);
db.conversation.hasMany(db.userToConversation);
db.userToConversation.belongsTo(db.conversation);
db.conversation.hasMany(db.message);
db.message.belongsTo(db.conversation); 
db.user.hasMany(db.message);
db.message.belongsTo(db.user);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;