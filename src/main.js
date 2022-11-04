import "./app.css";
import App from "./App.svelte";

import.meta.env.VITE_SOCIALS = import.meta.VITE_SOCIALS || '[{ "name": "GitHub", "href": "https://github.com/dylhack"}]',
import.meta.env.VITE_HOST = import.meta.env.VITE_HOST || "example.com";

export default new App({
  target: document.getElementById("app"),
});
