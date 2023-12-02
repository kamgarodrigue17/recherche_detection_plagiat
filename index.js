const express = require('express');
const axios = require('axios');
const download = require('download');
const cheerio = require('cheerio');
const morgan            = require("morgan")
const bodyParser        = require("body-parser") 
const cors  = require("cors")
const app = express();


const mimetype = require('mimetype');

const http = require('http').createServer(app);
const io = require('socket.io')(http);


const now = require('performance-now');
const wordcount = require('wordcount');
const mammoth = require('mammoth');
const multer = require('multer');



const puppeteer = require('puppeteer');

const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-parse');
const elementsAleatoires = require('./elementsAleatoires');
const traitement = require('./traitement');
const bertsimilarity = require('./bertsimilarity');
const comparePDFsWithInput = require('./comparePDFsWithInput');
const calculateSimilarity = require('./calculateSimilarity');
const getPlagiaDetail = require('./getPorcentage');
const getPourcentage = require('./getPorcentage');
const findPlagiarizedPhrases = require('./getPorcentage');
require('events').EventEmitter.defaultMaxListeners = 0

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit: '300mb'}))
app.use(cors());


const port = 5000;

app.use(express.json());// Handle SSE endpoint connection
app.use('/downloaded_pdfs',express.static(__dirname + '/downloaded_pdfs'))

app.use('/upload_docs',express.static(__dirname + '/upload_docs'))

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


 app.post('/analyse_doc',upload.single('document'), async (req, res) => {
 
if (req.file) {
  try {
    const fileBuffer = req.file.buffer;

    // Vérifiez le type du fichier (PDF ou Word)
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = await pdf(fileBuffer);
      
      res.json({ "nbmot": wordcount(dataBuffer.text), "page":dataBuffer.numpages ,"text":dataBuffer.text});
   
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      mammoth.extractRawText({ buffer: fileBuffer })
        .then(result => {
          
          
          console.log(result);
          res.json({ "nbmot": wordcount(result.value), "page":0 ,"text":result.value});

        })
        .catch(error => {
          console.error('Erreur lors de l analyse du document Word :', error);
          res.status(500).send('Erreur lors de la conversion du document Word.');
        });
    } else {
      res.status(400).send('Type de fichier non pris en charge.');
    }
  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier.');
  }
  
 }
 
 
 try {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ error: 'Veuillez fournir un lien vers le document.' });
  }

  // Télécharge le document à partir du lien
  const buffer = await download(link);

  // Détecte le type de fichier
  const detectedMimeType = mimetype.lookup(link);
  console.log(detectedMimeType)

  if (!detectedMimeType) {
    return res.status(400).json({ error: 'Type de fichier non pris en charge ou impossible à détecter.' });
  }

  

  if (detectedMimeType === 'application/pdf') {
    // Pour les fichiers PDF
    const data = await pdf(buffer);
   
    res.json({ "nbmot": wordcount(data.text), "page":data.numpages ,"text":data.text});

   
  } else if (detectedMimeType === 'application/docx') {
    // Pour les fichiers Word
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    
    res.json({ "nbmot":wordcount(result.value), "page":0 ,"text":result.value});

  } else {
    res.status(400).json({ error: 'Type de fichier non pris en charge.' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Une erreur est survenue lors du traitement du document.' });
}
 
 
 
 });
 const doc1 = "Ceci est un exemple de document. Une erreur est survenue lors. L'API est en cours d'exécution sur http://localhost:5000. ";
 const doc2 = "L'API est en cours d'exécution sur http://localhost:5000. Une erreur est survenue lors.";
 
calculateSimilarity(doc1,doc2)
//findPlagiarizedPhrases(doc1,doc2)








app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur http://localhost:${port}`);
});
//bertsimilarity();
  
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





app.post('/getPlagiaDetail', async (req, res) => {
 
 
  try {
   
    
    console.log(req.body.text)
    getPlagiaDetail(req.body.text, req.body.pdfFiles,res);    
  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier.');
  }
 });

app.post('/traitement_doc', async (req, res) => {
 
 
  try {
   
    
    console.log(req.body.text)
      traitement(req,res, elementsAleatoires(req.body.text.split('\n\n')),req.body.text)
    
  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier.');
  }
 });

 app.post('/detection', async (req, res) => {
 
 
  try {
   
    
    return comparePDFsWithInput(req.body.text, req.body.pdfFiles,res,
      0);    
  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier.');
  }
 });


    
   

    
    
      
      
      
      
   



    






























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