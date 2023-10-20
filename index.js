const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const morgan            = require("morgan")
const bodyParser        = require("body-parser") 
const cors  = require("cors")
const app = express();
 const fs = require('fs');
 const download = require('download');
 const stringSimilarity = require('string-similarity');

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const natural = require('natural');

const now = require('performance-now');

const mammoth = require('mammoth');
const multer = require('multer');



const puppeteer = require('puppeteer');

const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-parse');


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit: '300mb'}))
app.use(cors());


const port = 3000;

app.use(express.json());// Handle SSE endpoint connection
app.use('/upload',express.static(__dirname + '/downloaded_pdfs'))


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
      const text = dataBuffer.text;
    
      traitement(req,res,text)
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      mammoth.extractRawText({ buffer: fileBuffer })
        .then(result => {
          const text = result.value;
          traitement(req,res,text)
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
 function traitement(req,res,textdoc) {
  try {
    
    const documentText = textdoc;
    searchGoogleForPDFs(documentText)
    .then(pdfLinks => {
        console.log(pdfLinks)
     return downloadPDFs(pdfLinks, outputFolder);
    })
    .then(pdfFiles => {

      return comparePDFsWithInput(documentText, pdfFiles,res,
      0);
    })
    .then(similarityResults => {
      console.log('Résultats de la comparaison :', similarityResults);
    })
    .catch(error => {
      console.error('Erreur dans lapplication :', error);
    });




   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la détection du plagiat.' });
  }

  
 }

app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur http://localhost:${port}`);
});
 linksToCompare =[]
 
 

 async function searchGoogleForPDFs(query) {
  console.log(`https://www.google.com/search?q=${encodeURIComponent(formatText(query))}&num=10&filter=0`)

    try {
      const browser = await puppeteer.launch({
  args: ['--no-sandbox'],
  headless: true,
  ignoreHTTPSErrors: true,
  defaultViewport: null,
  args: ['--start-maximized'],
});
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  
      // Effectuer une recherche Google avec la requête
      await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&num=10&filter=0`);
      
      // Extraire les liens pertinents pointant vers des fichiers PDF
      var ct =await page.content();
      console.log(ct.toString())
      const pdfLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        
        return links
          .map(link => link.href)
          .filter(href => href.endsWith('.pdf'));
      });
  
      await browser.close();

      return pdfLinks;
    } catch (error) {
      console.error('Erreur lors de la recherche de fichiers PDF :', error);
      throw error;
    }
  }
  
  async function downloadPDFs(pdfLinks, outputFolder) {
    const downloadedPDFs = [];
    for (const link of pdfLinks) {
        try {
           
          // Téléchargez les documents à partir des liens et stockez-les localement
          const fileName = link.split('/').pop();
          const filePath = `${outputFolder}/${fileName}`;
          await download(link, outputFolder, { filename: fileName });
          
          downloadedPDFs.push(filePath);
          //console.log(pdfLinks)
         

        } catch (error) {
          console.error(`Erreur lors du téléchargement de ${link}: ${error.message}`);
        }
      }
      return downloadedPDFs;
    }
  
  async function comparePDFsWithInput(inputFile, pdfFiles,res,algo) {
    try {
      // Charger le contenu du fichier d'entrée
    //  const inputBuffer = fs.readFileSync(inputFile);
     // const inputText = await pdf(inputBuffer);
  
//const inputTextContent = inputText.text;
const inputTextContent = inputFile;
      const similarityResults = [];
  
      // Comparer le texte du document d'entrée avec chaque fichier PDF téléchargé
      for (const pdfFile of pdfFiles) {
        const pdfBuffer = fs.readFileSync(pdfFile);
        const pdfText = await pdf(pdfBuffer);
  
        const pdfTextContent = pdfText.text;
  console.log(formatText(pdfText.text))
        // Implémentez votre propre algorithme de comparaison de texte ou utilisez une bibliothèque
        // Ici, un exemple simple de calcul de similarité (à améliorer)
        var similarity;
        switch (algo) {
          case 0:
            similarity = calculateSimilarity(inputTextContent, pdfTextContent);

            break;
            case 1:
               similarity = calculateSimilaritymidle(inputTextContent, pdfTextContent);

            break;
        
          default:
            similarity = calculateSimilaritybasic(inputTextContent, pdfTextContent);

            break;
        }
  
        similarityResults.push({ pdfFile, similarity });
      }
      if (res!=null) {
        res.json({ similarityResults });
      }
      return similarityResults;
    } catch (error) {
      console.error('Erreur lors de la comparaison des fichiers PDF :', error);
      throw error;
    }
  }
  


function calculateSimilaritybasic(text1, text2) {
    const start = now(); 
  // Exemple simplifié de calcul de similarité (à améliorer)
  const commonWords = text1.split(' ').filter(word => text2.includes(word));
  const similarity = (commonWords.length / text1.split(' ').length) * 100;

  
  
  const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
  const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes

  console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');
  return similarity;
}

function calculateSimilaritymidle(text1, text2) {
  // Utilisez string-similarity pour calculer la similarité entre les deux textes
  var similarity = stringSimilarity.compareTwoStrings(text1, text2) * 100;

  
  const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
  const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes

  console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');
  return similarity;
}




//calcule la similarité en utilisant l'indice de Jaccard, qui mesure la similitude entre deux ensembles
function calculateSimilarity(text1, text2) {
    const start = now(); 

  // Tokenizez les deux textes en mots
  const tokenizer = new natural.WordTokenizer();
  const tokens1 = new Set(tokenizer.tokenize(text1));
  const tokens2 = new Set(tokenizer.tokenize(text2));

  // Calculez la distance de Jaccard entre les deux ensembles de tokens
  const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
  const union = new Set([...tokens1, ...tokens2]);
  const jaccardSimilarity = intersection.size / union.size;

  // Convertissez la similarité en pourcentage
  const similarity = jaccardSimilarity * 100;
  
  const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
  const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes

  console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');

  return similarity;
}



  
  // Exemple d'utilisation de l'application
  const query = 'Texte à rechercher sur Internet';
  const outputFolder = 'downloaded_pdfs';
  const inputFile = 'input.pdf';
  const start = now(); 
  searchGoogleForPDFs(documentText)
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






    
   

    
    
      function formatText(inputText) {
        // Divisez le texte en paragraphes en utilisant un saut de ligne comme délimiteur
        const paragraphs = inputText.split('\n');
        
        // Supprimez les espaces vides au début et à la fin de chaque paragraphe
        const trimmedParagraphs = paragraphs.map(paragraph => paragraph.trim());
        
        // Supprimez les paragraphes vides
        const nonEmptyParagraphs = trimmedParagraphs.filter(paragraph => paragraph.length > 0);
        
        // Joignez les paragraphes formatés en une seule chaîne de caractères avec un espace entre les paragraphes
        const formattedText = nonEmptyParagraphs.join(' ');
        
        return formattedText;
      }
      
      
      
   



    






























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