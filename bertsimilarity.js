const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

function cosineSimilarity(doc1, doc2) {
    // Tokenization of documents
    const tokens1 = tokenizer.tokenize(doc1);
    const tokens2 = tokenizer.tokenize(doc2);

    // Creation of TF-IDF objects
    const tfidf1 = new natural.TfIdf();
    const tfidf2 = new natural.TfIdf();

    // Adding documents to TF-IDF objects
    tfidf1.addDocument(tokens1);
    tfidf2.addDocument(tokens2);

    // Storage for TF-IDF values
    const tfidfValues1 = {};
    const tfidfValues2 = {};

    // Extracting TF-IDF values for each term in the first document
    tfidf1.listTerms(0).forEach(({ term, tfidf }) => {
        tfidfValues1[term] = tfidf;
    });

    // Extracting TF-IDF values for each term in the second document
    tfidf2.listTerms(0).forEach(({ term, tfidf }) => {
        tfidfValues2[term] = tfidf;
    });

    // Extracting all unique terms
    const allTerms = new Set([...Object.keys(tfidfValues1), ...Object.keys(tfidfValues2)]);

    // Creation of TF-IDF vectors
    const vector1 = Array.from(allTerms).map(term => tfidfValues1[term] || 0);
    const vector2 = Array.from(allTerms).map(term => tfidfValues2[term] || 0);

    // Calculation of the dot product between the vectors
    const dotProduct = vector1.reduce((sum, value, index) => sum + value * vector2[index], 0);

    // Calculation of the Euclidean norms of the vectors
    const norm1 = Math.sqrt(vector1.reduce((sum, value) => sum + value ** 2, 0));
    const norm2 = Math.sqrt(vector2.reduce((sum, value) => sum + value ** 2, 0));

    // Calculation of the cosine similarity
    const similarity = dotProduct / (norm1 * norm2);

    return similarity;
}



function bertsimilarity() {
 // Exemple d'utilisation
const doc1 = "Ceci est un exemple de document.";
const doc2 = "L'API est en cours d'exécution sur http://localhost:5000";

const similarity = cosineSimilarity(doc1, doc2);
console.log(`Similarité cosinus entre doc1 et doc2 : ${similarity}`);

}
module.exports=cosineSimilarity;
