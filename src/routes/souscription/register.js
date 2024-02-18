const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const { souscriptionTable,formuleTable,userTable} = require("../../db/sequelize");
const { json } = require('body-parser');



module.exports=(app) =>{
    app.post("/api/souscription/add",async (req,res)=>{
   
formule= await formuleTable.findByPk(req.body.formuleId);

    
        souscriptionTable.create(req.body)
        .then(rapport =>{


            userTable.findByPk(req.body.userId)
            .then(user=>{
  
              if (user) {
                // Mettez à jour le champ souhaité
               
                  
                  user.credit = 	formule.nbmot;
                
               
          
                // Enregistrez les modifications dans la base de données
                return user.save();
              } else {
                
             return   res.send('Utilisateur non trouvé');
              }
          
            }) .then(updatedUser => {
              if (updatedUser) {
                console.log('Champ modifié avec succès.');
                
                const message="L'souscription "+req.body.titre+" a bien été créé";
                return   res.status(200).json({message, data: rapport});
    
              }
            }).catch(err => {
              console.error('Erreur lors de la modification :', err);
            })
          
         
        })
        .catch(err =>{
            if(err instanceof ValidationError){
                console.log(err);
                return res.status(400).json({message: err.message, data: err});

            }
        console.log(err);
        return  res.status(500).json({message: "Erreur lors de l'ajout d'un annonce! Reessayer plus tard",err})
          })
});

}