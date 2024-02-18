const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const {userTable}= require("../../db/sequelize");

const privatekey=require('../../auth/private_key');

module.exports=(app)=>{
    app.get('/api/user/getbyid/:id',(req,res)=>{
        console.log(req.params);
        userTable.findByPk(req.params.id)
        .then(user=>{
            if(!user){
                const message="l'utilisateur demandé est inexistant";
                return res.status(404).json({message});
            }
          
                const message="L'utilisateur a ete connecte avec succes!";
                    return res.status(200).json({message, data:user});
           
        })
        .catch(err=>{
            console.log(err);
            const message="utiliaateur  non existant";
                    return res.status(500).json({message, data:err});
        })
    })
} 