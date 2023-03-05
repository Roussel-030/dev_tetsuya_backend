const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// }

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = require("./app/models");
const { conversation } = require("./app/models");
const Role = db.role;

// db.sequelize.sync({force: true}).then(()=>{
//     console.log("Drop and Resync Db");
//     initial();
// });

// const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req,res)=> {
    res.json({message: "Welcome to devhunt application"});
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/conversation/createConversation')(app);
require('./app/routes/conversation/findAllConversations')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

// const initial = () => {
//     Role.create({
//         id: 1,
//         name: "user"
//     });
//     Role.create({
//         id: 2,
//         name: "moderator"
//     });
//     Role.create({
//         id: 3,
//         name: "admin"
//     });
// } 