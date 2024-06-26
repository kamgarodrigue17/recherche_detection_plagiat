const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const {userTable}= require("../../db/sequelize");
const jwt = require('jsonwebtoken');

const private_key = require('../../auth/private_key');

module.exports=(app)=>{
    app.post('/api/user/login',(req,res)=>{
        console.log(req.body);
        
        userTable.findOne({where:{email:req.body.email}, include:[userTable]})
        .then(user=>{
            if(!user){
                const message="l'utilisateur demandé est inexistant";
                return res.status(404).json({message});
            }
            bcrypt.compare(req.body.password,user.password)
            .then(isPasswordValid=>{
                if(!isPasswordValid){
                    const message="Le mot de passe est incorrect!";
                    return res.status(401).json({message});
                }
            
                const token =jwt.sign(
                    {
                        clientsId:user.id
                    },
                    private_key,
                    {expiresIn:'1000h'}
                )
               // req.session.user=user;
                const message="L'utilisateur a ete connecte avec succes!";
                    return res.status(200).json({message, data:user,token});
             })
        })
        .catch(err=>{
            console.log(err);
            const message="La connexion a echoue! réessayez dans quelques instants";
                    return res.status(500).json({message, data:err});
        })
    })
} 