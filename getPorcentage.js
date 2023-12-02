const natural = require('natural');
const now = require('performance-now');
const fs = require('fs');
const pdf = require('pdf-parse');
const calculateSimilarity = require('./calculateSimilarity');
const calculateSimilaritymidle = require('./calculateSimilaritymidle');
const calculateSimilaritybasic = require('./calculateSimilaritybasic');
const formatText = require('./formatText');
const cosineSimilarity = require('./bertsimilarity');
const similarity = require('compute-cosine-similarity');





//methode qui faitb la reunion du nobre de mots unique et plagier
function getUnionsWithoutDuplicates(data,doc1) {
  const tokenizer = new natural.SentenceTokenizer();
  const sentences1 = tokenizer.tokenize(doc1);

  // Initialiser les tableaux pour les unions sans doublons
  var plagiarized=0;
var unique = 0;
totalphrase=sentences1.length

  // Parcourir chaque élément du tableau
  data.forEach(element => {
  
    // Obtenir les tableaux à partir des champs spécifiés
    const plagiarizedPhrases = element.analye.plagiarizedPhrasesrep.nb;
    const uniquePhrases = element.analye.uniquePhrasesrep.nb;
plagiarized=plagiarized<plagiarizedPhrases?plagiarizedPhrases:plagiarized;
unique=unique>uniquePhrases?uniquePhrases:unique;

});

 
  // Retourner les résultats
  return {
    plagiarized,
    unique,
    totalphrase
  };
}


function findPlagiarizedPhrases(doc1, doc2) {
  // Tokenization des documents en phrases
  const tokenizer = new natural.SentenceTokenizer();
  const sentences1 = tokenizer.tokenize(doc1);
  const sentences2 = tokenizer.tokenize(doc2);

  // Stockage des phrases plagiées et des phrases uniques
  const plagiarizedPhrases = [];
  const uniquePhrases = [];

  // Comparaison des phrases entre les deux documents
  sentences1.forEach(sentence1 => {
      if (sentences2.includes(sentence1)) {
          plagiarizedPhrases.push(sentence1);
      } else {
          uniquePhrases.push(sentence1);
      }
  });
  plagiarizedPhrasesrep={
    //"plagiarizedPhrases":plagiarizedPhrases,
    "nb":plagiarizedPhrases.length
  }
  uniquePhrasesrep={
    //"uniquePhrases":uniquePhrases,
    "nb":uniquePhrases.length
  }

console.log( { plagiarizedPhrasesrep, uniquePhrasesrep, });
  return { plagiarizedPhrasesrep, uniquePhrasesrep };
}



async function getPlagiaDetail(inputFile, pdfFiles,res) {
    try {
      // Charger le contenu du fichier d'entrée
    //  const inputBuffer = fs.readFileSync(inputFile);
     // const inputText = await pdf(inputBuffer);
  
//const inputTextContent = inputText.text;
const inputTextContent = inputFile;
      var similarityResults = [];
  
      // Comparer le texte du document d'entrée avec chaque fichier PDF téléchargé
      for (const pdfFile of pdfFiles) {
        const pdfBuffer = fs.readFileSync(pdfFile);
        const pdfText = await pdf(pdfBuffer);
  
        const pdfTextContent = pdfText.text;
  console.log(formatText(pdfText.text))
        // Implémentez votre propre algorithme de comparaison de texte ou utilisez une bibliothèque
        // Ici, un exemple simple de calcul de similarité (à améliorer)
        var analye;
        
        analye = findPlagiarizedPhrases(inputTextContent, pdfTextContent);

          
  
        similarityResults.push({ pdfFile, analye });
      }
      if (res!=null) {
      similarityResults=getUnionsWithoutDuplicates(similarityResults,inputTextContent);
        res.json({ similarityResults });
      }
      return similarityResults;
    } catch (error) {
      console.error('Erreur lors de la comparaison des fichiers PDF :', error);
      throw error;
    }
  }
  module.exports = getPlagiaDetail;
