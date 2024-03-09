const {souscriptionTable, userTable,formuleTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');


module.exports = (app)=>{
  app.get("/api/souscription/ByUser/:userId", (req ,res)=>{

    souscriptionTable.findAll({
        where:{userId:req.params.userId},

        include:[userTable,formuleTable]
      }
        
      )
      .then(conso =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: conso})

      })
      .catch(err =>{
        console.log(err)
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })
    
})

}