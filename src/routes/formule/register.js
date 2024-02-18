const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const { formuleTable } = require('../../db/sequelize');

const upload =require("../../middleware/formuleUpload")



module.exports=(app) =>{
    app.post("/api/formules/add",upload.single("image"),(req,res)=>{
        if(req.file){
                  req.body.image = req.file.path
                 
               }else{
                   req.body.image = ""
               }

       
       
        formuleTable.create(req.body)
        .then(aeroport =>{
            const message="formule "+req.body.titre+" a bien été créé";
            res.status(200).json({message, data: aeroport});

        })
        .catch(err =>{
            if(err instanceof ValidationError){
                return res.status(400).json({message: err.message, data: err});

            }
            
            res.status(500).json({message: "Erreur lors de l'ajout d'une aeroport! Reessayer plus tard",err})
          })
});

}