export function getFile() {
  const myFile = document.querySelector("#fichier");
  document.querySelector(".btn-file").addEventListener("click", () => {
    myFile.click();
  });
}
