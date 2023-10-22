const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const metaphone = natural.Metaphone;

// Fonction pour détecter la paraphrase
function detectParaphrase(sentence1, sentence2) {
  // Tokenization des phrases en mots
  const words1 = tokenizer.tokenize(sentence1);
  const words2 = tokenizer.tokenize(sentence2);

  // Création des codes phonétiques Metaphone pour chaque mot
  const metaphone1 = words1.map(word => metaphone.process(word));
  const metaphone2 = words2.map(word => metaphone.process(word));

  // Calcul de la similarité des codes phonétiques
  const similarity = natural.JaroWinklerDistance(metaphone1.join(' '), metaphone2.join(' '));

  return similarity;
}

// Exemple d'utilisation

const sentence1 = "Le chien court dans le parc.";
const sentence2 = "Un chien se déplace rapidement à l'extérieur.";

const similarity = detectParaphrase(sentence1, sentence2);
console.log(`Pourcentage de similarité: ${similarity * 100}%`);
