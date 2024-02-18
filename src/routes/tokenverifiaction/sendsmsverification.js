//5B4E7E8B36GDBJQ9PY4SY8QD
const accountSid = 'AC89f197dfc31301b4c33343d88f4e7489';
const authToken = '62be8f8b36da6c93e46abcac5595cf50';
const client = require('twilio')(accountSid, authToken);
const { v4: uuidv4 } = require('uuid');
const { tokenverificationTable } = require('../../db/sequelize');

const { baseUrl } = require('../../db/env');




function generateToken() {
  return uuidv4();
}

function generateSixDigitCode() {
    const min = 100000; // Le plus petit nombre à 6 chiffres (100000)
    const max = 999999; // Le plus grand nombre à 6 chiffres (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
 
  
  

  module.exports=(app)=>{
app.post('/api/smsVerification', async (req, res) => {
    const email = req.body.numero;
    const token = generateSixDigitCode();
    const expirationDate = new Date(Date.now() + 24 * 3600 * 1000); // Expiration dans 24 heures
  tokenverificationTable.create({
    email,
    token,
    expiresAt: expirationDate,
  }).then(tokenv=>{

  
   
  client.messages.create({
    body: ' E-transit mobile \n votre code de verification est:'+token,
    from: '+12052094536',
    to: email,
  })
  .then(message =>{
    console.log('Message SID : ' + message.sid)
    return res.status(200).json({ message:'Message SID : ' + message.sid,token:token});


  } ).catch(err=>{
    console.log(err);
    const message="erreur d envois de sms";
            return res.status(500).json({message, data:err});
})

     

  }).catch(err=>{
            console.log(err);
            const message="erreur de creation du token";
                    return res.status(500).json({message, data:err});
        });
    
  
   
  
   
  });
 } 