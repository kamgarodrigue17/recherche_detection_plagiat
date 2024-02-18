import React, { useEffect, useRef } from 'react';

const PdfViewer = ({ pdfContent, plagiarizedPhrases }) => {
  const viewerRef = useRef();

  useEffect(() => {
    const renderPdf = async () => {
      // Assuming pdfjs is available globally (you can also import it)
      const pdfjsLib = window.pdfjsLib;

      const pdfDoc = await pdfjsLib.getDocument({ data: pdfContent }).promise;
      const viewerContainer = viewerRef.current;

      for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
        const page = await pdfDoc.getPage(pageNumber);

        const textContent = await page.getTextContent();
        const textLayer = document.createElement('div');
        textLayer.className = 'textLayer';

        textContent.items.forEach(item => {
          const textSpan = document.createElement('span');
          textSpan.textContent = item.str;

          // Check if the text is in the plagiarizedPhrases array
          if (plagiarizedPhrases.includes(item.str)) {
            textSpan.style.backgroundColor = '#ff0000'; // Red background for plagiarism
          }

          textLayer.appendChild(textSpan);
        });

        viewerContainer.appendChild(textLayer);
      }
    };

    renderPdf();
  }, [pdfContent, plagiarizedPhrases]);

  return <div ref={viewerRef} />;
};

export default PdfViewer;
var plagiarizedPhrases =[
  "Introduction au Génie Logiciel",
  "F.",
  "Langrognet",
  "F.",
  "LangrognetGénie logicielSeptembre 20161 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 20162 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 20163 / 28\n\nLe Génie Logiciel\nDéfinition\nLe génie logiciel est une science de génie industriel qui étudie les méthodes\nde travail et les bonnes",
  "pratiques.",
  "Le génie logiciel s’intéresse en particulier aux procédures qui permettent de\nproduire des logiciels qui\ncorrespondent aux attentes du client, aux besoins\nsoient fiables\naient un coût d’entretien réduit et de bonnes performances\nrespectent les délais et les coûts de construction",
  "F.",
  "LangrognetGénie logicielSeptembre 20164 / 28\n\n1re étape : Bien se comprendre\nDifficultés\nMultiplicité des acteurs, des rôles\nI\nClient, utilisateur (ce n’est pas forcément le même)\nI\nInformaticiens\nF\nChef de projet\nF\nArchitecte\nF\nDéveloppeur\nF\nTesteur\nF\nMaintenance, documentation,",
  "...",
  "I\nMarketing, diffusion, formation\nLangages, vocabulaires différents",
  "F.",
  "LangrognetGénie logicielSeptembre 20165 / 28\n\nHow Projects Really Work (version",
  "Create your own cartoon at",
  "How the customer\nexplained it\nHow the project leader\nunderstood it\nHow the analyst\ndesigned it\nHow the programmer\nwrote it\nWhat the beta testers\nreceived\nHow the business\nconsultant described it\nHow the project was\ndocumented\nWhat operations\ninstalled\nHow the customer was\nbilled\nHow it was supportedWhat marketing\nadvertised\nWhat the customer\nreally needed",
  "F.",
  "LangrognetGénie logicielSeptembre 20166 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 20167 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 20168 / 28\n\nLes étapes (1)\nListe (non",
  "exhaustive...)",
  "Définition des besoins\n-> Dans le langage du client\nSpécifications\nTraduction des besoins dans un langageplus informatique\n-> Ce que doit faire le logiciel (et non comment il le fait)\nConception\nTraduction des spécifications en termes de concepts logiciels\nCodage\n-> Traduction de la conception en code\nTests\nI\nunitaires (Test de chaque module individuellement)\nI\nd’intégration (Test de la composition de plusieurs modules)",
  "F.",
  "LangrognetGénie logicielSeptembre 20169 / 28\n\nLes étapes (2)\nListe (non",
  "exhaustive...)",
  "Validation - Vérification\nAvons-nous construit le bon logiciel ?",
  "->Validé\nAvons-nous bien construit le logiciel ?",
  "->Vérifié\nLivraison / Diffusion\nSupport, formation\nMaintenance\nEvolution (nouvelles versions,",
  "....)",
  "F.",
  "LangrognetGénie logicielSeptembre 201610 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 201611 / 28\n\nModèles - Méthodes\nCycle de vie\nLe cycle de vie désigne toutes lesétapesdu développement d’un logiciel, de\nsa conception à sa",
  "disparition.",
  "Modèles\nLes modèles décrivent les liens, les relations entre les différentesétapesdu\ncycle de vie du",
  "logiciel.",
  "Méthodes\nLes méthodes permettent de mettre en oeuvre un développement logiciel\nselon un modèle en organisant les différentesétapesdu cycle de vie du",
  "logiciel.",
  "F.",
  "LangrognetGénie logicielSeptembre 201612 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 201613 / 28\n\nCycle en cascade",
  "F.",
  "LangrognetGénie logicielSeptembre 201614 / 28\n\nCycle en V",
  "F.",
  "LangrognetGénie logicielSeptembre 201615 / 28\n\nMéthodes tradtionnelles\nAvantages\nAisé à comprendre et à mettre en œuvre\nForte structuration : définition puis réalisation\nInconvénents\nModèle idéalisé, ne tient pas compte de la nature itérative d’un projet\nLogiciel délivré seulement à la fin du projet\nI\nAttente du client\nI\nConformité, validation tardive\nI\nCoût élevé en cas de non-conformité",
  "F.",
  "LangrognetGénie logicielSeptembre 201616 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 201617 / 28\n\nCycle itératif (ou en spirale)\nEvolution vers des méthodes plus souples, plus itératives",
  "F.",
  "LangrognetGénie logicielSeptembre 201618 / 28\n\nCycle itératif\nAvantages\nCombine les avantages des modèles en cascade/V\nTient compte de la nature itérative d’un projet\nBonne visibilité au cours du cycle de vie\nInconvénents\nDifficile à comprendre sans être expert technique\nNécessite une capacité à bien analyser les risques",
  "F.",
  "LangrognetGénie logicielSeptembre 201619 / 28\n\nAgilité et TDD\nLe test au coeur du processus\nDans le TDD (Test Driven Development) : on écrit les tests avant le code\nLes méthodes agiles reposent sur ce concept et intègre des règles pour\ndiminuer les délais de mise à disposition d’une nouvelle version (’petits pas’)",
  "F.",
  "LangrognetGénie logicielSeptembre 201620 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement",
  "F.",
  "LangrognetGénie logicielSeptembre 201621 / 28\n\nDéveloppement et tests",
  "F.",
  "LangrognetGénie logicielSeptembre 201622 / 28\n\nCoût de résolution de bugs\nTests et développement\nTests unitaires\n-> 50% du coût total du projet\nTests d’intégration (lors composition des modules, ou composants)\n-> 10 fois le coût d’un bug détecté lors des tests unitaires\nTests système, validation (adéquation aux spécifications)\n->100 fois le coût d’un bug détecté lors des tests unitaires",
  "F.",
  "LangrognetGénie logicielSeptembre 201623 / 28",
  "F.",
  "LangrognetGénie logicielSeptembre 201624 / 28\n\nIntroduction au Génie Logiciel",
  "F.",
  "Langrognet",
  "F.",
  "LangrognetGénie logicielSeptembre 201625 / 28"
]
/* "\n\nIntroduction au Génie Logiciel\nF. Langrognet\nF. LangrognetGénie logicielSeptembre 20161 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 20162 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 20163 / 28\n\nLe Génie Logiciel\nDéfinition\nLe génie logiciel est une science de génie industriel qui étudie les méthodes\nde travail et les bonnes pratiques.\nLe génie logiciel s’intéresse en particulier aux procédures qui permettent de\nproduire des logiciels qui\ncorrespondent aux attentes du client, aux besoins\nsoient fiables\naient un coût d’entretien réduit et de bonnes performances\nrespectent les délais et les coûts de construction\nF. LangrognetGénie logicielSeptembre 20164 / 28\n\n1re étape : Bien se comprendre\nDifficultés\nMultiplicité des acteurs, des rôles\nI\nClient, utilisateur (ce n’est pas forcément le même)\nI\nInformaticiens\nF\nChef de projet\nF\nArchitecte\nF\nDéveloppeur\nF\nTesteur\nF\nMaintenance, documentation, ...\nI\nMarketing, diffusion, formation\nLangages, vocabulaires différents\nF. LangrognetGénie logicielSeptembre 20165 / 28\n\nHow Projects Really Work (version 1.5)\nCreate your own cartoon at www.projectcartoon.com\nHow the customer\nexplained it\nHow the project leader\nunderstood it\nHow the analyst\ndesigned it\nHow the programmer\nwrote it\nWhat the beta testers\nreceived\nHow the business\nconsultant described it\nHow the project was\ndocumented\nWhat operations\ninstalled\nHow the customer was\nbilled\nHow it was supportedWhat marketing\nadvertised\nWhat the customer\nreally needed\nF. LangrognetGénie logicielSeptembre 20166 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 20167 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 20168 / 28\n\nLes étapes (1)\nListe (non exhaustive...)\nDéfinition des besoins\n-> Dans le langage du client\nSpécifications\nTraduction des besoins dans un langageplus informatique\n-> Ce que doit faire le logiciel (et non comment il le fait)\nConception\nTraduction des spécifications en termes de concepts logiciels\nCodage\n-> Traduction de la conception en code\nTests\nI\nunitaires (Test de chaque module individuellement)\nI\nd’intégration (Test de la composition de plusieurs modules)\nF. LangrognetGénie logicielSeptembre 20169 / 28\n\nLes étapes (2)\nListe (non exhaustive...)\nValidation - Vérification\nAvons-nous construit le bon logiciel ? ->Validé\nAvons-nous bien construit le logiciel ? ->Vérifié\nLivraison / Diffusion\nSupport, formation\nMaintenance\nEvolution (nouvelles versions, ....)\nF. LangrognetGénie logicielSeptembre 201610 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 201611 / 28\n\nModèles - Méthodes\nCycle de vie\nLe cycle de vie désigne toutes lesétapesdu développement d’un logiciel, de\nsa conception à sa disparition.\nModèles\nLes modèles décrivent les liens, les relations entre les différentesétapesdu\ncycle de vie du logiciel.\nMéthodes\nLes méthodes permettent de mettre en oeuvre un développement logiciel\nselon un modèle en organisant les différentesétapesdu cycle de vie du\nlogiciel.\nF. LangrognetGénie logicielSeptembre 201612 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 201613 / 28\n\nCycle en cascade\nF. LangrognetGénie logicielSeptembre 201614 / 28\n\nCycle en V\nF. LangrognetGénie logicielSeptembre 201615 / 28\n\nMéthodes tradtionnelles\nAvantages\nAisé à comprendre et à mettre en œuvre\nForte structuration : définition puis réalisation\nInconvénents\nModèle idéalisé, ne tient pas compte de la nature itérative d’un projet\nLogiciel délivré seulement à la fin du projet\nI\nAttente du client\nI\nConformité, validation tardive\nI\nCoût élevé en cas de non-conformité\nF. LangrognetGénie logicielSeptembre 201616 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 201617 / 28\n\nCycle itératif (ou en spirale)\nEvolution vers des méthodes plus souples, plus itératives\nF. LangrognetGénie logicielSeptembre 201618 / 28\n\nCycle itératif\nAvantages\nCombine les avantages des modèles en cascade/V\nTient compte de la nature itérative d’un projet\nBonne visibilité au cours du cycle de vie\nInconvénents\nDifficile à comprendre sans être expert technique\nNécessite une capacité à bien analyser les risques\nF. LangrognetGénie logicielSeptembre 201619 / 28\n\nAgilité et TDD\nLe test au coeur du processus\nDans le TDD (Test Driven Development) : on écrit les tests avant le code\nLes méthodes agiles reposent sur ce concept et intègre des règles pour\ndiminuer les délais de mise à disposition d’une nouvelle version (’petits pas’)\nF. LangrognetGénie logicielSeptembre 201620 / 28\n\nPLAN\n1\nGénie logiciel\n2\nCycle de vie du logiciel\nEtapes\nModèles, méthodes\nMéthodes historiques\nMéthodes itératives\nLes tests au coeur du processus de développement\nF. LangrognetGénie logicielSeptembre 201621 / 28\n\nDéveloppement et tests\nF. LangrognetGénie logicielSeptembre 201622 / 28\n\nCoût de résolution de bugs\nTests et développement\nTests unitaires\n-> 50% du coût total du projet\nTests d’intégration (lors composition des modules, ou composants)\n-> 10 fois le coût d’un bug détecté lors des tests unitaires\nTests système, validation (adéquation aux spécifications)\n->100 fois le coût d’un bug détecté lors des tests unitaires\nF. LangrognetGénie logicielSeptembre 201623 / 28\n\nF. LangrognetGénie logicielSeptembre 201624 / 28\n\nIntroduction au Génie Logiciel\nF. Langrognet\nF. LangrognetGénie logicielSeptembre 201625 / 28"
*/