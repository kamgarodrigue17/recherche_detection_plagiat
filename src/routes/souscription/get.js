const {souscriptionTable,userTable,formuleTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');
const verifyToken = require("../../middleware/auth");


module.exports = (app)=>{
  app.get("/api/souscription/all/", verifyToken,(req ,res)=>{

    souscriptionTable.findAll({
        include:[userTable,formuleTable]
      }
        
      )
      .then(conso =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: conso})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })
    
})

}