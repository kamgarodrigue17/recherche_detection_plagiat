export function closeModal() {
  document.querySelector(".icon-close").addEventListener("click", () => {
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector(".overlay").classList.remove("flex");
  });
}
