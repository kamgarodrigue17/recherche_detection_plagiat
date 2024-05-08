const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const { rapportTable } = require("../../db/sequelize");
const { json } = require('body-parser');


const upload =require("../../middleware/rapportUploaud");
const verifyToken = require('../../middleware/auth');
module.exports=(app) =>{
    app.post("/api/rapport/add",verifyToken,upload.single("rapport"),(req,res)=>{
   


        if(req.file){
          
                  req.body.rapport = req.file.path
                 
               }else{
                   req.body.rapport = ""
               }
        rapportTable.create(req.body)
        .then(rapport =>{
          
            const message="Le rapport "+req.body.titre+" a bien été créé";
            res.status(200).json({message, data: rapport});

        })
        .catch(err =>{
            if(err instanceof ValidationError){
                console.log(err);
                return res.status(400).json({message: err.message, data: err});

            }
        console.log(err);
            res.status(500).json({message: "Erreur lors de l'ajout d'un annonce! Reessayer plus tard",err})
          })
});

}