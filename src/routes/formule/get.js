const {formuleTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');
const verifyToken = require("../../middleware/auth");


module.exports = (app)=>{
  app.get("/api/formules/all/", verifyToken,(req ,res)=>{

      formuleTable.findAll()
      .then(conso =>{
        const message ="La liste de a bien ete recuperer!"
        res.status(200).json({message,data: conso})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })
    
})

}