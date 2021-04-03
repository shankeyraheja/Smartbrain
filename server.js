const express = require("express")
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const app = express()
const knex = require("knex")
const Register = require("./Controllers/Register.js")
const Signin = require("./Controllers/Signin.js")
const Image = require("./Controllers/image.js")
const Profile = require("./Controllers/profile.js")
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Wolverine',
    database : 'smart_brain'
  }
});


app.use(bodyparser.json())
app.use(cors())


app.get("/", (req,res) =>{
  res.send(database.users)
})

app.get("/profile/:id", (req,res) => {Profile.handleprofile(req,res,db)})
app.post("/signin", (req,res) => {Signin.handlesignin(req,res,db,bcrypt)})
app.post("/register", (req,res) => {Register.handleregister(req,res,db,bcrypt)})
app.put("/image", (req,res) => {Image.handleimage(req,res,db)})
app.post("/imageurl", (req,res) => {Image.handleapicall(req,res)})

app.listen(3000, ()=> {
  console.log("app is running on port 3000")
})
