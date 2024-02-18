const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const {userTable}= require("../../db/sequelize");

const upload =require("../../middleware/uploaduser")
module.exports=(app) =>{
    app.post("/api/user/register",upload.single("photo"),(req,res)=>{
       
        
        req.body.password= bcrypt.hashSync(req.body.password,10);
      
        if(req.file){
     console.log(req.files);
           req.body.photo = req.file.path
          
        }else{
            req.body.photo = ""
        }
        userTable.create(req.body)
        .then(user =>{
            
            const message="  user "+req.body.nom+" a bien été créé";
            res.status(200).json({message, data: user});

        })
        .catch(err =>{
            if(err){
                console.log(err)
                return res.status(400).json({message: err.message, data: err});

            }
            
            res.status(500).json({message: "Erreur lors de l'ajout d'un user! Reessayer plus tard",err})
          })
    });
}