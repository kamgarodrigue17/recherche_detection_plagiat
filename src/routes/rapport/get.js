const {rapportTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');
const { userTable } = require('../../db/sequelize');


module.exports = (app)=>{
  app.get("/api/rapport/all/", (req ,res)=>{

    rapportTable.findAll({
        include:[userTable]
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