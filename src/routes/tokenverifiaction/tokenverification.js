
const { Sequelize } = require("sequelize");
const { tokenverificationTable, userTable } = require("../../db/sequelize");


module.exports=(app)=>{

    app.get('/mailverify/:type/:email/:token', async (req, res) => {
        const token = req.params.token;
        const now =new Date();
      console.log(req.params.email)
      console.log(getCurrentDateTime())
        const verificationToken = await tokenverificationTable.findOne({
          where: {
            email:req.params.email,
            token:token,
            expiresAt: {
              [Sequelize.Op.gt]: now, // Vérifiez si expiresAt est supérieur à la date actuelle
            },
          },
        });
      
        if (verificationToken) {


         if (req.params.type==="email") {
          userTable.findOne({where:{email:`${req.params.email}`}})
          .then(user=>{

            if (user) {
              // Mettez à jour le champ souhaité
             
                
                user.emailverif = 1;
              
             
        
              // Enregistrez les modifications dans la base de données
              return user.save();
            } else {
              
              res.send('Utilisateur non trouvé');
            }
        
          }) .then(updatedUser => {
            if (updatedUser) {
              console.log('Champ modifié avec succès.');
              
          res.send('E-mail vérifié avec succès');
            }
          }).catch(err => {
            console.error('Erreur lors de la modification :', err);
          })


          
         }




         if (req.params.type==="sms") {
          userTable.findOne({where:{tel:req.params.email}})
          .then(user=>{

            if (user) {
              // Mettez à jour le champ souhaité
              
                
                user.numverif = 1;
            
        
              // Enregistrez les modifications dans la base de données
              return user.save();
            } else {
              
              res.send('Utilisateur non trouvé 1');
            }
        
          }) .then(updatedUser => {
            if (updatedUser) {
              console.log('Champ modifié avec succès.');
              
          res.send('E-mail vérifié avec succès');
            }
          }).catch(err => {
            console.error('Erreur lors de la modification :', err);
          })

          
         }


        
        } else {
          res.send('Token invalide ou expiré');
        }
      });
      
}
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
 
const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}