
    // Fonction pour calculer la similarité de cosinus
    function cosineSimilarity(vector1, vector2) {
      // Calcul du produit scalaire
      let dotProduct = 0;
      for (const word in vector1) {
        if (vector2.hasOwnProperty(word)) {
          dotProduct += vector1[word] * vector2[word];
        }
      }

      // Calcul des magnitudes
      let magnitude1 = 0;
      for (const word in vector1) {
        magnitude1 += vector1[word] ** 2;
      }
      magnitude1 = Math.sqrt(magnitude1);

      let magnitude2 = 0;
      for (const word in vector2) {
        magnitude2 += vector2[word] ** 2;
      }
      magnitude2 = Math.sqrt(magnitude2);

      // Calcul de la similarité de cosinus
      if (magnitude1 === 0 || magnitude2 === 0) {
        return 0.0;
      }

      return dotProduct / (magnitude1 * magnitude2);
    }

    // Fonction pour prétraiter une phrase
    function preprocessText(text) {
      text = text.toLowerCase(); // Conversion en minuscules
      text = text.split(/\s+/); // Tokenisation par espace (vous pouvez ajuster selon votre besoin)
      return text;
    }

    // Fonction pour calculer le pourcentage de similarité
    function similarityPercentage(sentence1, sentence2) {
      const words1 = preprocessText(sentence1);
      const words2 = preprocessText(sentence2);

      const vector1 = {};
      const vector2 = {};

      // Création des vecteurs de fréquence des mots
      for (const word of words1) {
        if (vector1[word]) {
          vector1[word]++;
        } else {
          vector1[word] = 1;
        }
      }

      for (const word of words2) {
        if (vector2[word]) {
          vector2[word]++;
        } else {
          vector2[word] = 1;
        }
      }

      const similarity = cosineSimilarity(vector1, vector2);

      return similarity;
    }

    // Exemple d'utilisation
    const paraphrase1 = "La météo aujourd'hui est ensoleillée bonjour madame.";
    const paraphrase2 = "La météo aujourd'hui est ensoleillée bonjour madame.";
    const similarity = similarityPercentage(paraphrase1, paraphrase2);
    console.log(`Similarité de cosinus : ${similarity.toFixed(3)}`);
