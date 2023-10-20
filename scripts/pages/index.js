import { closeModal } from "../helpers/closeModal.mjs";

import { openModal } from "../helpers/openModal.mjs";
import { sendData } from "../helpers/sendData.mjs";

document.addEventListener("DOMContentLoaded", () => {
  openModal();
  closeModal();
  sendData();
});
