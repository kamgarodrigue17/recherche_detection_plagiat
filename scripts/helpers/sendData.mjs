export function sendData() {
  document.querySelector(".btn-valid").addEventListener("click", () => {
    const dataFile = document.querySelector("#fichier");
    // verification de l'input
    if (dataFile.files.length === 0) {
      document.querySelector(".alert").textContent =
        "Veuillez uploader un fichier";
    } else {
      // processus d'envoie de données
      let data = new FormData();
      data.append("document", dataFile.files[0]);
      data.append("algo", 1);

      try {
        document.querySelector(
          ".main"
        ).innerHTML = `<span class="loader"></span>`;
        fetch("http://localhost:3000/detection-plagiat", {
          method: "POST",
          body: data,
        })
          .then((res) => {
            res.json().then((response) => {
              console.log(response);
              document.querySelector(
                ".main"
              ).innerHTML = `<span>Scrapping réussi </span>`;
            });
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
        document.querySelector(
          ".main"
        ).innerHTML = `<span>Problème de connexion</span>`;
      }
    }
  });
}
