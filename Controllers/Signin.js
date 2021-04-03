handlesignin = (req,res, db,bcrypt) => {
    const {email, password} = req.body
    if (!email || !password){
      return res.status(400).json("incorrect form submission");
    }
    db.select("email","hash").from("login")
    .where("email", "=", email)
    .then(data =>{
      const valid = bcrypt.compareSync(password, data[0].hash)
      if(valid){
        db.select("*").from("users")
        .where("email", "=", email).then(user => {
          res.json({status: "success", info: user[0]})
        }).catch(err => res.status(400).json("unable to get user details"))
      }else{
        res.status(400).json("Wrong Credentials")
      }
    }).catch(err => res.status(400).json("Wrong Credentials"))
    }
module.exports = {
  handlesignin: handlesignin
}
