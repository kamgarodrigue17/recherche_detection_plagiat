export function openModal() {
  document.querySelector(".btn-open").addEventListener("click", () => {
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector(".overlay").classList.add("flex");
  });
}
