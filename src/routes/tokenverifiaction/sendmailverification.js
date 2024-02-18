const { v4: uuidv4 } = require('uuid');
const { tokenverificationTable } = require('../../db/sequelize');
const nodemailer = require('nodemailer');
const { baseUrl } = require('../../db/env');
function generateSixDigitCode() {
  const min = 100000; // Le plus petit nombre à 6 chiffres (100000)
  const max = 999999; // Le plus grand nombre à 6 chiffres (999999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'etransitmobile@gmail.com',
      pass:"ttzr tqqv txpw zytx"// 'Maguoum2001',
    },
  });


  module.exports=(app)=>{
app.post('/api/mailVerification', async (req, res) => {
    const email = req.body.email;
    const token =generateSixDigitCode();
    const expirationDate = new Date(Date.now() + 24 * 3600 * 1000); // Expiration dans 24 heures
  tokenverificationTable.create({
    email,
    token,
    expiresAt: expirationDate,
  }).then(tokenv=>{

  console.log()
    const mailOptions = {
        from: 'kamgarodrigue54@gmail.com',
        to: email,
        subject: ' E-transit Vérification d\'e-mail',
        text: `Cliquez sur ce lien pour vérifier votre e-mail : ${baseUrl}/mailverify/email/${email}/${token}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message:error});


        } else {
          console.log('E-mail de vérification envoyé : ' + info.response);
          return res.status(200).json({ message:'E-mail de vérification envoyé : ' + info.response});
        }
      });

  }).catch(err=>{
            console.log(err);
            const message="erreur de creation du token";
                    return res.status(500).json({message, data:err});
        });
    
  
   
  
   
  });
 } 