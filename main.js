import App from "./src/app";
import { $ } from "./src/utils/querySelector";

window.addEventListener("DOMContentLoaded", () => {
  new App($("#app"));
});