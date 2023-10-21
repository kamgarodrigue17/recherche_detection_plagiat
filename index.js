const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const morgan            = require("morgan")
const bodyParser        = require("body-parser") 
const cors  = require("cors")
const app = express();



const http = require('http').createServer(app);
const io = require('socket.io')(http);


const now = require('performance-now');

const mammoth = require('mammoth');
const multer = require('multer');



const puppeteer = require('puppeteer');

const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-parse');
const elementsAleatoires = require('./elementsAleatoires');
const traitement = require('./traitement');
require('events').EventEmitter.defaultMaxListeners = 0

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit: '300mb'}))
app.use(cors());


const port = 5000;

app.use(express.json());// Handle SSE endpoint connection
app.use('/downloaded_pdfs',express.static(__dirname + '/downloaded_pdfs'))


// Configurez Multer pour gérer les fichiers uploadés
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const documentText = "De la programmation orient´ee-objet `a l’architecture en passant par les patrons de conception,la programmation par aspects et le typage dynamique, ce cours gradu´e est l’occasion de trouver des r´eponses `a vos questions en g´enie logiciel et de poser de nouvelles questions. Ce cours est destin´e aux ´etudiants que le g´enie logiciel sous toutes ses formes int´eresse et qui veulent approfondir leurs connaissances et toucher `a des domaines recherche pointus. Il s’adresse `a des ´etudiants motiv´es1, connaissant d´ej`a bien la programmation et ayant de bonnes bases en g´enie logiciel (IFT2251) et, si possible, dans des domaines connexes (IFT390X). Le professeur souhaite que les ´etudiants qui s’inscrivent au cours viennent `a toutes les s";

app.post('/detection-plagiat',upload.single('document'), async (req, res) => {
 
 
  try {
    const fileBuffer = req.file.buffer;

    // Vérifiez le type du fichier (PDF ou Word)
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = await pdf(fileBuffer);
      var text = dataBuffer.text
    console.log(text.split('\n\n'))
      traitement(req,res, elementsAleatoires(text.split('\n\n')),text)
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      mammoth.extractRawText({ buffer: fileBuffer })
        .then(result => {
          const text = result.value;
          console.log(text.split('\n\n'))
          traitement(req,res,elementsAleatoires(text.split('\n\n')),text)
        })
        .catch(error => {
          console.error('Erreur lors de la conversion du document Word :', error);
          res.status(500).send('Erreur lors de la conversion du document Word.');
        });
    } else {
      res.status(400).send('Type de fichier non pris en charge.');
    }
  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier.');
  }
 
 
 
 
 
 
 
 
 });


app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur http://localhost:${port}`);
});
 
  
  // Exemple d'utilisation de l'application
  const query = 'Texte à rechercher sur Internet';
  const outputFolder = 'downloaded_pdfs';
  const inputFile = 'input.pdf';
  const start = now(); 
  /*searchGoogleForPDFs(documentText)
    .then(pdfLinks => {
        console.log(pdfLinks)
     return downloadPDFs(pdfLinks, outputFolder);
    })
    .then(pdfFiles => {
      return comparePDFsWithInput(documentText, pdfFiles);
    })
    .then(similarityResults => {
      console.log('Résultats de la comparaison :', similarityResults);

    const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
    const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes
    console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');
    })
    .catch(error => {
      console.error('Erreur dans lapplication :', error);
    });
*/





    
   

    
    
      
      
      
      
   



    






























 /*
 async function getSimilarLinks(searchQuery) {
   try {
     // Effectuez une recherche Google en utilisant le texte comme requête de recherche
     const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
     const response = await axios.get(searchUrl);
 
     // Utilisez Cheerio pour extraire les liens des résultats de recherche
     const $ = cheerio.load(response.data);
     const links = [];
 
     // Les liens dans les résultats de recherche Google sont généralement dans des balises "a"
     $('a').each((index, element) => {
       const link = $(element).attr('href');
       if (link && link.startsWith('http')) {
         links.push(link);
       }
     });
 console.log(links)
     return links;
   } catch (error) {
     console.error('Erreur lors de la recherche de liens similaires :', error);
     throw error;
   }
 }
 
 async function downloadDocuments(links, outputFolder) {
   for (const link of links) {
     try {
       // Téléchargez les documents à partir des liens et stockez-les localement
       const fileName = link.split('/').pop();
       await download(link, outputFolder, { filename: fileName });
     } catch (error) {
       console.error(`Erreur lors du téléchargement de ${link}: ${error.message}`);
     }
   }
 }
 
 async function compareDocuments(documentText, documentFolderPath) {
   // Lisez le contenu du document d'entrée
   const inputDocumentText = fs.readFileSync(documentFolderPath + '/input.txt', 'utf-8');
 
   // Comparez le texte du document d'entrée avec chaque document téléchargé
   // Vous pouvez utiliser une bibliothèque de comparaison de texte ici
   // Par exemple : const similarity = compareText(inputDocumentText, downloadedText);
 
   // Affichez les résultats de la comparaison
   // console.log('Similarity with', fileName, 'is', similarity);
 }
 
 // Exemple d'utilisation
 const searchQuery = 'Texte à rechercher sur Internet';
 const outputFolder = 'downloaded_documents';
 
 getSimilarLinks(documentText)
   .then(links => {
     downloadDocuments(links, outputFolder).then(() => {
       compareDocuments(searchQuery, outputFolder);
     });
   })
   .catch(error => {
     console.error('Erreur lors de la recherche de liens similaires :', error);
   });
 */