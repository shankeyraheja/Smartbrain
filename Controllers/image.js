const Clarifai = require("clarifai");
const app = new Clarifai.App({
 apiKey: '69d5812ed83148238bbcab723bbdb3ad'
});

const handleapicall = (req,res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data)
  })
}

handleimage = (req,res,db)=>{
  const {id} = req.body
  db("users").where("id", "=", id)
  .increment("entries",1)
  .returning("entries")
  .then(entries => {
    res.json(entries[0])
  }).catch(err => res.status(400).json("Unable to retrieve entries"))
  }



module.exports = {
  handleimage:handleimage,
  handleapicall: handleapicall
}
