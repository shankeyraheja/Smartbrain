const handleregister = (req,res, db, bcrypt)=>{
  const {name, email, password} = req.body
  const hash = bcrypt.hashSync(password)
  if (!email || !name || !password){
    return res.status(400).json("incorrect form submission");
  }
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into("login")
    .returning("email")
    .then(loginemail => {
      return trx("users").returning("*").insert({
        email: loginemail[0],
        name: name,
        joined: new Date()
      }).then(response => res.json(response[0]))
    })

  .then(trx.commit)
  .catch(trx.rollback)
  })
}

module.exports = {
  handleregister:handleregister
}
